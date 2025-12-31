"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import OneImageView from "@/src/app/(dashboard)/manage/_components/imageView/single";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import SingleUploadImage from "@/src/app/(dashboard)/manage/_components/upload/single";
import {
  StrategicItem,
  FileType,
  UploadedFileMeta,
} from "@/src/services/interface";
import { useDeleteData } from "@/src/hooks/useApi";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import { useState } from "react";
import { ImgInput, imgSchema } from "@/src/schema/img.schema";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { goals_content_list } from "@/src/services/interface/constant";
import {
  getStrategicGoalsById,
  uptadeStrategicGoalsImage,
} from "@/src/actions/client/strategic-goals.actions";

export default function CategoriesUpdateImagePage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [isPending, startTransition] = useTransition();
  const currentPathname = usePathname();
  const SESSION_KEY = `tempFiles_${currentPathname}`;
  const router = useRouter();
  const UPLOADED_PATH_KEY = "latest_uploaded_path";
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta>(null);
  const { success, error } = useMessageStore();
  const getCategoryWrapper = async () => {
    const result = await getStrategicGoalsById({
      locale: "az",
      id: id as string,
    });

    return {
      data: result.data as StrategicItem | undefined,
      message: result.message,
      code: result.code,
    };
  };

  const { data: existingData, refetch } = useServerQueryById<StrategicItem>(
    goals_content_list,
    getCategoryWrapper,
    id,
    { locale: "az" }
  );

  const generalContentForm = useForm<ImgInput>({
    mode: "onChange",
    resolver: zodResolver(imgSchema),
    values: {
      imageId: String(existingData?.imageUrl?.id || ""),
    },
  });

  const { mutate: deleteFile } = useDeleteData<FileType>({
    invalidateKeys: [goals_content_list, `goals_content_list/${id}`],
  });

  const onSubmit = async (data: ImgInput) => {
    if (!data.imageId || !existingData?.documentId) {
      error("Şəkil yüklənmədi və ya kategori məlumatları tapılmadı!");
      return;
    }

    startTransition(async () => {
      try {
        const result = await uptadeStrategicGoalsImage(
          existingData.documentId,
          {
            imageId: data.imageId,
          }
        );

        if (result?.success) {
          success(result?.message || "Məlumat uğurla yadda saxlandı!");

          if (existingData?.imageUrl?.id) {
            deleteFile(
              { endpoint: `files/delete-file/${existingData.imageUrl.id}` },
              {
                onSuccess: () => {
                  console.log("Köhnə şəkil uğurla silindi.");
                },
                onError: (error) => {
                  console.error("Köhnə şəkli silərkən xəta:", error);
                },
              }
            );
          }

          await refetch();
          setUploadedFile(null);
          if (typeof window !== "undefined" && window.sessionStorage) {
            window.sessionStorage.removeItem(SESSION_KEY);
            window.sessionStorage.removeItem(UPLOADED_PATH_KEY);
          }
          router.back();
        } else {
          error(result?.error || "Xəta baş verdi!");
        }
      } catch (err) {
        console.error("Update error:", err);
        error("Xəta baş verdi!");
      }
    });
  };

  const handleSetUploadedFile = (
    file: UploadedFileMeta | ((prev: UploadedFileMeta) => UploadedFileMeta)
  ) => {
    const newFile = typeof file === "function" ? file(uploadedFile) : file;
    setUploadedFile(newFile);

    const fileId =
      newFile && typeof newFile === "object" && "fileId" in newFile
        ? newFile.fileId?.toString()
        : "";

    generalContentForm.setValue("imageId", fileId, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <>
      <section className={"flex flex-col gap-4 mb-4.5"}>
        <h1 className={"text-2xl font-medium text-[#171717] mb-8"}>
          Şəkili dəyişin
        </h1>

        <form
          onSubmit={generalContentForm.handleSubmit(onSubmit)}
          className={"grid grid-cols-1 gap-2"}
        >
          <OneImageView
            selectedImage={existingData?.imageUrl || null}
            onDeleteSuccess={refetch}
          />

          <FieldBlock title="Şəkili daxil et">
            <SingleUploadImage
              label="Yükləmək üçün faylı vurun və ya sürükləyin"
              setFile={handleSetUploadedFile}
              file={uploadedFile}
              isImageCropActive={true}
              isParentFormSubmitted={false}
            />
          </FieldBlock>

          <div className={"grid grid-cols-2 gap-5"}>
            <NavigateBtn />
            <SubmitAdminButton
              title={existingData?.translations?.[0]?.title}
              isLoading={isPending}
              disabled={!generalContentForm.formState.isDirty || isPending}
            />
          </div>
        </form>
      </section>
    </>
  );
}
