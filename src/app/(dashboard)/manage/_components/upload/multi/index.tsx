"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, File, AlertCircle } from "lucide-react";
import { usePostData, useDeleteData } from "@/src/hooks/useApi";
import { FileType, UploadedFileMeta } from "@/src/services/interface";
import ReactFancyBox from "@/src/lib/fancybox";
import { usePathname } from "next/navigation";

interface CustomUploadFile {
  type: string;
  uid: string;
  name: string;
  status: "done" | "uploading" | "error";
  url?: string;
  fileId?: number;
  fileKey?: string;
  size?: number;
}

interface MultiUploadProps {
  files: UploadedFileMeta[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFileMeta[]>>;
  label?: string;
  acceptType?: string;
  maxCount?: number;
  maxSize?: number;
  isParentFormSubmitted?: boolean;
}

const MultiUploadImage: React.FC<MultiUploadProps> = ({
  files,
  setFiles,
  label = "Faylları Yüklə",
  acceptType = "*/*",
  maxCount = 10,
  maxSize = 10,
  isParentFormSubmitted = false,
}) => {
  const [fileList, setFileList] = useState<CustomUploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorTimers, setErrorTimers] = useState<Record<string, number>>({});
  const currentPathname = usePathname();

  const uploadQueueRef = useRef<File[]>([]);
  const isUploadingRef = useRef(false);
  const timerRefs = useRef<Record<string, NodeJS.Timeout>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CF_PUBLIC_URL = process.env.NEXT_PUBLIC_CF_PUBLIC_ACCESS_URL;
  const SESSION_KEY = `tempFiles_multi_${currentPathname}`;
  const UPLOADED_PATH_KEY = "latest_uploaded_multi_path";

  const { mutate: uploadFile, isPending: uploadLoading } = usePostData<{ data: FileType }, FormData>();
  const { mutate: deleteFile, isPending: deleteLoading } = useDeleteData<FileType>();

  // --- Yardımçı Funksiyalar ---
  
  const updateSessionIds = useCallback((newIds: number[]) => {
    if (typeof window !== "undefined") {
      if (newIds.length === 0) {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(UPLOADED_PATH_KEY);
      } else {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(newIds));
        sessionStorage.setItem(UPLOADED_PATH_KEY, currentPathname);
      }
    }
  }, [SESSION_KEY, UPLOADED_PATH_KEY, currentPathname]);

  const startErrorTimer = useCallback((fileUid: string) => {
    if (timerRefs.current[fileUid]) return;

    setErrorTimers((prev) => ({ ...prev, [fileUid]: 10 }));

    timerRefs.current[fileUid] = setInterval(() => {
      setErrorTimers((prev) => {
        const currentTime = prev[fileUid];
        
        if (currentTime === undefined || currentTime <= 1) {
          if (timerRefs.current[fileUid]) {
            clearInterval(timerRefs.current[fileUid]);
            delete timerRefs.current[fileUid];
          }
          setFileList((list) => list.filter((f) => f.uid !== fileUid));
          const { [fileUid]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [fileUid]: currentTime - 1 };
      });
    }, 1000);
  }, []);

  const processNextUpload = useCallback(() => {
    if (isUploadingRef.current || uploadQueueRef.current.length === 0) return;

    const fileToUpload = uploadQueueRef.current.shift();
    if (!fileToUpload) return;

    isUploadingRef.current = true;
    const tempUid = `upload-${Date.now()}-${Math.random()}-${fileToUpload.name}`;

    const tempFile: CustomUploadFile = {
      uid: tempUid,
      name: fileToUpload.name,
      status: "uploading",
      type: fileToUpload.type,
      size: fileToUpload.size,
    };

    setFileList((prev) => [...prev, tempFile]);

    const formData = new FormData();
    formData.append("file", fileToUpload);

    uploadFile(
      { endpoint: "files/upload-file", payload: formData },
      {
        onSuccess: (response) => {
          const fileData = response.data;
          setFileList((prev) =>
            prev.map((f) =>
              f.uid === tempUid
                ? { ...f, status: "done", url: fileData.relativePath, fileId: fileData.fileId, fileKey: fileData.fileKey }
                : f
            )
          );

          setFiles((prev) => {
            const newFile: UploadedFileMeta = {
              fileId: fileData.fileId,
              fileKey: fileData.fileKey || "",
              type: fileData.type || fileToUpload.type || "unknown",
              publicUrl: fileData.fullUrl || "",
              path: fileData.relativePath || "",
              fullUrl: fileData.fullUrl || "",
            };
            const updated = [...prev, newFile];
            updateSessionIds(updated.map(f => f?.fileId).filter(Boolean) as number[]);
            return updated;
          });

          isUploadingRef.current = false;
          processNextUpload();
        },
        onError: () => {
          setFileList((prev) =>
            prev.map((f) => (f.uid === tempUid ? { ...f, status: "error" } : f))
          );
          startErrorTimer(tempUid);
          isUploadingRef.current = false;
          processNextUpload();
        },
      }
    );
  }, [uploadFile, setFiles, updateSessionIds, startErrorTimer]);

  // --- Event Handler-lər ---

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles).filter(f => f.size / 1024 / 1024 < maxSize);
      const availableSlot = maxCount - fileList.filter(f => f.status !== "error").length;
      const finalFiles = filesArray.slice(0, availableSlot);
      
      if (finalFiles.length > 0) {
        uploadQueueRef.current.push(...finalFiles);
        processNextUpload();
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = async (uploadFile: CustomUploadFile) => {
    if (timerRefs.current[uploadFile.uid]) {
      clearInterval(timerRefs.current[uploadFile.uid]);
      delete timerRefs.current[uploadFile.uid];
    }

    if (!uploadFile.fileId) {
      setFileList(prev => prev.filter(f => f.uid !== uploadFile.uid));
      return;
    }

    deleteFile(
      { endpoint: `files/delete-file/${uploadFile.fileId}` },
      {
        onSuccess: () => {
          setFileList(prev => prev.filter(f => f.uid !== uploadFile.uid));
          setFiles(prev => {
            const updated = prev.filter(f => f?.fileId !== uploadFile.fileId);
            updateSessionIds(updated.map(f => f?.fileId).filter(Boolean) as number[]);
            return updated;
          });
        },
      }
    );
  };

  // --- Təmizlik və Session Management ---

  useEffect(() => {
    return () => {
      Object.values(timerRefs.current).forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    if (isParentFormSubmitted) {
      setFileList([]);
      uploadQueueRef.current = [];
      isUploadingRef.current = false;
      Object.values(timerRefs.current).forEach(clearInterval);
      timerRefs.current = {};
      setErrorTimers({});
    }
  }, [isParentFormSubmitted]);

  const getFullImageUrl = (currentFile: CustomUploadFile) => {
    if (!currentFile.url) return "";
    if (currentFile.url.startsWith("blob:")) return currentFile.url;
    return `${CF_PUBLIC_URL}${currentFile.url.startsWith("/") ? currentFile.url.slice(1) : currentFile.url}`;
  };

  return (
    <div className="w-full">
      <input ref={fileInputRef} type="file" onChange={handleFileSelect} accept={acceptType} multiple className="hidden" />

      <div
        onClick={() => !uploadLoading && !deleteLoading && fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files) handleFileSelect({ target: { files: e.dataTransfer.files } } as any); }}
        className={`relative border-[2px] border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${uploadLoading || deleteLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Upload className="mx-auto mb-4 text-blue-500" size={48} />
        <p className="text-gray-700 font-medium">{label}</p>
        <p className="text-xs text-gray-400 mt-2">Maksimum {maxCount} fayl, hər biri {maxSize}MB</p>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {fileList.map((file) => (
          <div key={file.uid} className={`p-3 border rounded-lg flex items-center justify-between gap-3 ${file.status === "error" ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {file.status === "error" ? <AlertCircle className="text-red-500" size={24} /> : 
               file.type?.startsWith("image/") && file.url ? <img src={getFullImageUrl(file)} className="w-12 h-12 object-cover rounded" /> : 
               <File className="text-blue-500" size={24} />}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {file.status === "uploading" ? "Yüklənir..." : file.status === "error" ? <span className="text-red-500">Xəta ({errorTimers[file.uid]}s)</span> : "Tamamlandı"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {file.status === "done" && (
                <button onClick={() => handleRemove(file)} className="text-xs text-red-600 border border-red-300 px-3 py-1.5 rounded hover:bg-red-50">Sil</button>
              )}
              {file.status === "error" && (
                <button onClick={() => handleRemove(file)} className="p-1 hover:bg-red-100 rounded-full"><X className="text-red-500" size={20} /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MultiUploadImage);