/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import MultiUploadImage from "@/src/app/(dashboard)/manage/_components/upload/multi";
import MultiImageView from "@/src/app/(dashboard)/manage/_components/imageView/multi";
import { IAboutHome, UploadedFileMeta } from "@/src/services/interface";
import { GalleryInput, gallerySchema } from "@/src/schema/img.schema";
import { uptadeHomeAboutGalleryImages } from "@/src/actions/client/about-home.actions";
interface Props {
  existingData: IAboutHome | undefined;
  refetch: () => void;
}
export default function GalleryUpdateImagePage({
  existingData,
  refetch,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const currentPathname = usePathname();
  const router = useRouter();

  // Session Storage Keys
  const SESSION_KEY = `tempFiles_${currentPathname}`;
  const MULTI_SESSION_KEY = `tempFiles_multi_${currentPathname}`;
  const UPLOADED_PATH_KEY = "latest_uploaded_path";
  const UPLOADED_MULTI_PATH_KEY = "latest_uploaded_multi_path";
  const [galleryFiles, setGalleryFiles] = useState<UploadedFileMeta[]>([]);

  const generalForm = useForm<GalleryInput>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      galleryIds: [],
    },
  });

  useEffect(() => {
    if (existingData?.gallery) {
      const ids = existingData.gallery.map((file) => String(file?.id));
      generalForm.reset({ galleryIds: ids });
    }
  }, [existingData]);

  useEffect(() => {
    const dbIds = existingData?.gallery?.map((file) => String(file?.id)) || [];
    const newFileIds = galleryFiles.map((file) => String(file?.fileId) || "");
    const combinedIds = [...dbIds, ...newFileIds];

    generalForm.setValue("galleryIds", combinedIds, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [galleryFiles]);

  const onSubmit = async (data: GalleryInput) => {
    if (!existingData?.documentId) {
      message.error("Sənəd ID-si tapılmadı!");
      return;
    }

    startTransition(async () => {
      try {
        const result = await uptadeHomeAboutGalleryImages(
          existingData.documentId,
          {
            galleryIds: data.galleryIds,
          }
        );

        if (result?.success) {
          message.success("Məlumat uğurla yadda saxlandı!");

          await refetch();
          setGalleryFiles([]);

          if (typeof window !== "undefined" && window.sessionStorage) {
            window.sessionStorage.removeItem(SESSION_KEY);
            window.sessionStorage.removeItem(MULTI_SESSION_KEY);
            window.sessionStorage.removeItem(UPLOADED_PATH_KEY);
            window.sessionStorage.removeItem(UPLOADED_MULTI_PATH_KEY);
          }

          router.back();
          router.refresh();
        } else {
          message.error(result?.error || "Xəta baş verdi!");
        }
      } catch (error) {
        console.error("Update error:", error);
        message.error("Xəta baş verdi!");
      }
    });
  };

  return (
    <section className="flex flex-col gap-4 mb-4.5">
      <h1 className="text-2xl font-medium text-[#171717] mb-8">
        Qalereya şəkillərini dəyişin
      </h1>

      <form
        onSubmit={generalForm.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <FieldBlock title="Qalereya şəkilləri">
          <MultiImageView
            selectedImages={existingData?.gallery || []}
            onDeleteSuccess={refetch}
          />
          <div className="mt-4">
            <MultiUploadImage
              label="Yeni qalereya şəkilləri əlavə edin"
              setFiles={setGalleryFiles}
              files={galleryFiles}
              isParentFormSubmitted={false}
              maxCount={20}
              maxSize={10}
              acceptType="image/*"
            />
          </div>
        </FieldBlock>

        <div className="grid grid-cols-2 gap-5 max-w-lg">
          <NavigateBtn />
          <SubmitAdminButton
            title={existingData?.translations?.[0]?.title}
            isLoading={isPending}
            disabled={!generalForm.formState.isDirty || isPending}
          />
        </div>
      </form>
    </section>
  );
}
