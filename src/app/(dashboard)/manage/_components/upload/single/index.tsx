"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, File, AlertCircle } from "lucide-react";
import { usePostData, useDeleteData } from "@/src/hooks/useApi";
import { FileType, UploadedFileMeta } from "@/src/services/interface";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "@/src/utils/cropImageUtility";
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
}

interface ImageUploadProps {
  file: UploadedFileMeta | null;
  setFile: React.Dispatch<React.SetStateAction<UploadedFileMeta | null>>;
  label?: string;
  acceptType?: string;
  isImageCropActive?: boolean;
  isParentFormSubmitted?: boolean;
}

const SingleUploadImage: React.FC<ImageUploadProps> = ({
  file,
  setFile,
  label = "Fayl Yüklə",
  acceptType = "*/*",
  isImageCropActive = true,
  isParentFormSubmitted = false,
}) => {
  const [fileList, setFileList] = useState<CustomUploadFile[]>([]);
  const [uploadedFileIds, setUploadedFileIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorTimer, setErrorTimer] = useState<number | null>(null);
  const currentPathname = usePathname();
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const CF_PUBLIC_URL = process.env.NEXT_PUBLIC_CF_PUBLIC_ACCESS_URL;
  const SESSION_KEY = `tempFiles_${currentPathname}`;
  const UPLOADED_PATH_KEY = "latest_uploaded_path";
  const { mutate: uploadFile, isPending: uploadLoading } = usePostData<
    { data: FileType },
    FormData
  >();
  const { mutate: deleteFile, isPending: deleteLoading } =
    useDeleteData<FileType>();

  const isImageFile = (f: File): boolean => f?.type?.startsWith("image/");

  // Error auto-remove timer
  useEffect(() => {
    if (fileList[0]?.status === "error") {
      setErrorTimer(10);

      timerRef.current = setInterval(() => {
        setErrorTimer((prev) => {
          if (prev === null || prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setFileList([]);
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      setErrorTimer(null);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [fileList]);

  const uploadFileToServer = useCallback(
    (fileToUpload: File) => {
      if (typeof window !== "undefined" && uploadedFileIds.length > 0) {
        sessionStorage.removeItem(SESSION_KEY);
      }

      const tempFile: CustomUploadFile = {
        uid: `upload-${Date.now()}-${fileToUpload.name}`,
        name: fileToUpload.name,
        status: "uploading",
        type: fileToUpload.type,
      };

      setFileList([tempFile]);

      const formData = new FormData();
      formData.append("file", fileToUpload);

      uploadFile(
        { endpoint: "files/upload-file", payload: formData },
        {
          onSuccess: (response) => {
            const fileData = response.data;
            const newFileId = fileData.fileId;

            setUploadedFileIds((prev) => {
              const newIds = [...prev, newFileId];
              if (typeof window !== "undefined") {
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(newIds));
                sessionStorage.setItem(UPLOADED_PATH_KEY, currentPathname);
              }
              return newIds;
            });

            setFileList([
              {
                ...tempFile,
                status: "done",
                url: fileData.relativePath,
                fileId: fileData.fileId,
                fileKey: fileData.fileKey,
                type: fileData.type || fileToUpload.type,
              },
            ]);

            setFile({
              fileId: fileData.fileId,
              fileKey: fileData.fileKey ?? "",
              type: fileData.type,
              publicUrl: fileData.fullUrl ?? "",
              path: fileData.relativePath,
              fullUrl: fileData.fullUrl,
            });
          },
          onError: () => {
            setFileList([{ ...tempFile, status: "error" }]);
            setFile(null);
          },
        }
      );
    },
    [uploadFile, setFile, SESSION_KEY, currentPathname, uploadedFileIds]
  );

  const processFile = (uploadedFile: File) => {
    if (isImageCropActive && isImageFile(uploadedFile)) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropSrc(reader.result as string);
        setPendingFile(uploadedFile);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      setFileList([]);
      uploadFileToServer(uploadedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    const initialCropOptions = { unit: "%" as const, width: 90 };
    let newCrop;
    if (aspect) {
      newCrop = makeAspectCrop(initialCropOptions, aspect, width, height);
    } else {
      newCrop = { ...initialCropOptions, height: 90 };
    }
    setCrop(centerCrop(newCrop, width, height));
  };

  const handleSaveCrop = async () => {
    if (!completedCrop || !imgRef.current || !pendingFile) return;

    try {
      const blob = await getCroppedImg(imgRef.current, completedCrop);
      if (blob) {
        const fileExtension =
          pendingFile.name.split(".").pop()?.toLowerCase() || "png";
        const mimeType = `image/${fileExtension}`;
        const originalName = pendingFile.name.replace(/\.[^/.]+$/, "");

        const croppedFile = new (window.File as any)(
          [blob],
          `${originalName}_cropped.${fileExtension}`,
          { type: mimeType }
        );
        closeModal();
        uploadFileToServer(croppedFile);
      }
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };
  const handleDimensionChange = (
    dimension: "width" | "height",
    value: number
  ) => {
    if (value > 0 && imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;

      // Cari pikselləri götürürük və ya sıfırdan başlayırıq
      let newPixelWidth = completedCrop?.width || 0;
      let newPixelHeight = completedCrop?.height || 0;

      if (dimension === "width") {
        newPixelWidth = Math.min(value, naturalWidth);
        if (aspect) newPixelHeight = newPixelWidth / aspect;
      } else {
        newPixelHeight = Math.min(value, naturalHeight);
        if (aspect) newPixelWidth = newPixelHeight * aspect;
      }

      const newPixelCrop: PixelCrop = {
        unit: "px",
        x: completedCrop?.x || 0,
        y: completedCrop?.y || 0,
        width: newPixelWidth,
        height: newPixelHeight,
      };

      // Faizlə olan crop-u da yeniləməliyik ki, vizual olaraq qutu yerində qalsın
      const newPercentCrop: Crop = {
        unit: "%",
        x: (newPixelCrop.x / naturalWidth) * 100,
        y: (newPixelCrop.y / naturalHeight) * 100,
        width: (newPixelCrop.width / naturalWidth) * 100,
        height: (newPixelCrop.height / naturalHeight) * 100,
      };

      setCompletedCrop(newPixelCrop);
      setCrop(newPercentCrop);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCropSrc(null);
    setPendingFile(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setImageDimensions(null);
  };

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const cropOptions = { unit: "%" as const, width: 90 };
      let newCrop;
      if (newAspect) {
        newCrop = makeAspectCrop(cropOptions, newAspect, width, height);
      } else {
        newCrop = { ...cropOptions, height: 90 };
      }
      setCrop(centerCrop(newCrop, width, height));
      setCompletedCrop(undefined);
    }
  };

  const handleRemove = async (uploadFile: CustomUploadFile) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!uploadFile.fileId) {
      setFileList([]);
      setFile(null);
      return;
    }

    await deleteFile(
      { endpoint: `files/delete-file/${uploadFile.fileId}` },
      {
        onSuccess: () => {
          const removedId = uploadFile.fileId!;
          setFile(null);
          setFileList([]);

          setUploadedFileIds((prev) => {
            const newIds = prev.filter((id) => id !== removedId);
            if (typeof window !== "undefined") {
              if (newIds.length === 0) {
                sessionStorage.removeItem(SESSION_KEY);
                sessionStorage.removeItem(UPLOADED_PATH_KEY);
              } else {
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(newIds));
              }
            }
            return newIds;
          });
        },
      }
    );
  };

  useEffect(() => {
    if (file === null && fileList.length > 0 && isParentFormSubmitted) {
      setFileList([]);
    }
  }, [file, fileList.length, isParentFormSubmitted]);

  const cleanupTempFiles = useCallback(async () => {
    if (typeof window === "undefined") return;

    const pathIds = sessionStorage.getItem(SESSION_KEY);
    const idsToCleanup: number[] = pathIds ? JSON.parse(pathIds) : [];

    if (idsToCleanup.length === 0 || isParentFormSubmitted) return;

    try {
      const formData = new FormData();
      formData.append("fileIds", JSON.stringify(idsToCleanup));
      navigator.sendBeacon("/api/files/cleanup-temp-files", formData);
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(UPLOADED_PATH_KEY);
    } catch (error) {
      console.error("Cleanup error:", error);
    }
  }, [isParentFormSubmitted, SESSION_KEY]);

  useEffect(() => {
    if (typeof window === "undefined" || isParentFormSubmitted) return;
    window.addEventListener("beforeunload", cleanupTempFiles);
    return () => window.removeEventListener("beforeunload", cleanupTempFiles);
  }, [cleanupTempFiles, isParentFormSubmitted]);

  useEffect(() => {
    return () => {
      if (typeof window === "undefined" || isParentFormSubmitted) return;
      const uploadedPath = sessionStorage.getItem(UPLOADED_PATH_KEY);
      if (
        uploadedFileIds.length > 0 &&
        uploadedPath &&
        uploadedPath !== currentPathname
      ) {
        cleanupTempFiles();
      }
    };
  }, [
    cleanupTempFiles,
    uploadedFileIds.length,
    isParentFormSubmitted,
    currentPathname,
    UPLOADED_PATH_KEY,
  ]);

  const getFullImageUrl = (currentFile: CustomUploadFile) => {
    if (!currentFile.url) return "";
    if (currentFile.url.startsWith("blob:")) return currentFile.url;
    const cleanUrl = currentFile.url.startsWith("/")
      ? currentFile.url.slice(1)
      : currentFile.url;
    return `${CF_PUBLIC_URL}${cleanUrl}`;
  };

  const currentFile = fileList[0];
  const isImage =
    currentFile?.type?.startsWith("image/") ||
    currentFile?.url?.match(/\.(jpe?g|png|gif|webp|svg)$/i);

  return (
    <>
      <div className="w-full">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept={acceptType}
          disabled={uploadLoading || deleteLoading}
          className="hidden"
        />

        <div
          onClick={() =>
            !uploadLoading && !deleteLoading && fileInputRef.current?.click()
          }
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-[2px] border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200 hover:border-blue-400 hover:bg-blue-50
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            ${
              uploadLoading || deleteLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          `}
        >
          <Upload className="mx-auto mb-4 text-blue-500" size={48} />
          <p className="text-gray-700 font-medium mb-1">{label}</p>
          <p className="text-sm text-gray-500">Və ya faylı bura sürüşdürün</p>
        </div>

        {currentFile && (
          <div
            className={`mt-5 p-4 border rounded-lg flex items-center justify-between gap-4 ${
              currentFile.status === "error"
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {currentFile.status === "error" ? (
                <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded border border-red-200">
                  <AlertCircle className="text-red-500" size={24} />
                </div>
              ) : isImage && currentFile.url ? (
                <img
                  src={getFullImageUrl(currentFile)}
                  alt={currentFile.name}
                  className="w-14 h-14 object-cover rounded border border-gray-200"
                />
              ) : (
                <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded border border-blue-200">
                  <File className="text-blue-500" size={24} />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentFile.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {currentFile.status === "uploading" && "Yüklənir..."}
                  {currentFile.status === "done" && "Uğurla yükləndi"}
                  {currentFile.status === "error" && (
                    <span className="text-red-500">
                      Xəta baş verdi
                      {errorTimer !== null && ` (${errorTimer}s)`}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              {currentFile.status === "uploading" && (
                <div className="w-5 h-5 border-[2px] border-gray-200 border-t-blue-500 rounded-full animate-spin" />
              )}

              {currentFile.status === "done" && (
                <>
                  {isImage ? (
                    <ReactFancyBox>
                      <a
                        href={getFullImageUrl(currentFile)}
                        data-fancybox="gallery"
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                      >
                        <ImageIcon size={16} className="inline mr-1" />
                        Önizləmə
                      </a>
                    </ReactFancyBox>
                  ) : (
                    <a
                      href={getFullImageUrl(currentFile)}
                      download={currentFile.name}
                      className="px-3 py-1.5 border border-gray-300 rounded text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                    >
                      Yüklə
                    </a>
                  )}

                  <button
                    onClick={() => handleRemove(currentFile)}
                    disabled={deleteLoading}
                    type="button"
                    className="px-3 py-1.5 border border-red-300 rounded text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deleteLoading ? "Silinir..." : "Sil"}
                  </button>
                </>
              )}

              {currentFile.status === "error" && (
                <button
                  onClick={() => handleRemove(currentFile)}
                  type="button"
                  className="p-2 hover:bg-red-100 rounded-full transition-colors cursor-pointer"
                  title="Bağla"
                >
                  <X className="text-red-500" size={20} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && cropSrc && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-[95vw] overflow-x-auto w-full max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-4">
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 overflow-auto max-h-[65vh]">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                className="max-w-full" // Konteynerdən kənara çıxmaması üçün
              >
                <img
                  ref={imgRef}
                  src={cropSrc}
                  onLoad={onImageLoad}
                  alt="Kəsiləcək şəkil"
                  // BU HİSSƏ ÇOX VACİBDİR:
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </ReactCrop>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex gap-4 justify-center items-center text-sm">
                {imageDimensions && (
                  <p>
                    Orijinal: <strong>{imageDimensions.width}</strong> x{" "}
                    <strong>{imageDimensions.height}</strong>px
                  </p>
                )}
                {completedCrop?.width && completedCrop?.height ? (
                  <p>
                    Kəsilmiş: <strong>{Math.round(completedCrop.width)}</strong>{" "}
                    x <strong>{Math.round(completedCrop.height)}</strong>px
                  </p>
                ) : (
                  <p className="text-gray-500">Kəsim sahəsini tənzimləyin</p>
                )}
              </div>

              <div className="flex gap-4 justify-center items-center">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600 font-medium">
                    En (px)
                  </label>
                  <input
                    type="number"
                    value={completedCrop ? Math.round(completedCrop.width) : 0}
                    onChange={(e) =>
                      handleDimensionChange(
                        "width",
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded text-center text-sm"
                  />
                </div>

                <span className="text-xl text-gray-400 mt-5">×</span>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600 font-medium">
                    Hündürlük (px)
                  </label>
                  <input
                    type="number"
                    value={completedCrop ? Math.round(completedCrop.height) : 0}
                    onChange={(e) =>
                      handleDimensionChange(
                        "height",
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded text-center text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-center flex-wrap">
                {[
                  { label: "Sərbəst", value: undefined },
                  { label: "16:9", value: 16 / 9 },
                  { label: "4:3", value: 4 / 3 },
                  { label: "Kvadrat", value: 1 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleAspectChange(item.value)}
                    type="button"
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      aspect === item.value
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                type="button"
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors"
              >
                Ləğv et
              </button>
              <button
                onClick={handleSaveCrop}
                type="button"
                className="px-5 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
              >
                Yadda Saxla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(SingleUploadImage);
