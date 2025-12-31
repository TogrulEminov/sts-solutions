"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SingleUploadImage from "@/src/app/(dashboard)/manage/_components/upload/single";
import { useState, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import CreateButton from "@/src/app/(dashboard)/manage/_components/createButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomLocales, UploadedFileMeta } from "@/src/services/interface";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { useForm } from "react-hook-form";
import MultiUploadImage from "@/src/app/(dashboard)/manage/_components/upload/multi";
import CustomAdminEditor from "@/src/app/(dashboard)/manage/_components/CreateEditor";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import {
  CreateServiceCategoryInput,
  createServiceCategorySchema,
} from "@/src/schema/service.schema";
import { createServicesCategory } from "@/src/actions/client/services.actions";

export default function CreateContent() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta>(null);
  const [galleryFiles, setGalleryFiles] = useState<UploadedFileMeta[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success, error } = useMessageStore();
  const generalForm = useForm<CreateServiceCategoryInput>({
    resolver: zodResolver(createServiceCategorySchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      imageId: "",
      galleryIds: [],
      metaDescription: "",
      metaKeywords: "",
      metaTitle: "",
      locale: locale as CustomLocales,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
    getValues,
  } = generalForm;
  const onSubmit = async (data: CreateServiceCategoryInput) => {
    startTransition(async () => {
      const result = await createServicesCategory({
        ...data,
        galleryIds: galleryFiles.map((file) => file?.fileId?.toString() || ""),
        imageId: uploadedFile?.fileId?.toString() || "",
      });

      if (result.success) {
        success("Məlumat uğurla yadda saxlandı!");
        reset();
        setUploadedFile(null);
        setIsSuccess(true);
        if (typeof window !== "undefined" && window.sessionStorage) {
          const currentPathname = window.location.pathname;
          window.sessionStorage.removeItem(`tempFiles_${currentPathname}`);
          window.sessionStorage.removeItem("latest_uploaded_path");
        }

        router.back();
        router.refresh();
      } else {
        error(result.error || "Məlumat göndərilərkən xəta baş verdi.");
      }
    });
  };

  return (
    <>
      <section className={"flex flex-col gap-4 mb-5"}>
        <h1 className="font-medium text-[#171717] text-3xl mb-8">
          {locale === "az"
            ? "Azərbaycan dilində daxil et"
            : locale === "en"
            ? "İngilis dilində daxil et"
            : "Rus dilində daxil et"}
        </h1>
        <FormWrapper
          form={generalForm}
          onSubmit={handleSubmit(onSubmit)}
          className={"grid grid-cols-1 gap-5"}
        >
          <div className={"flex flex-col space-y-5"}>
            <FieldBlock>
              <FormInput
                label="Başlıq"
                placeholder="Başlıq"
                fieldName="title"
              />
              <FormInput
                label="Alt Başlıq"
                placeholder="Alt Başlıq"
                fieldName="subtitle"
              />
              <CustomAdminEditor
                title="Qısa məlumat"
                value={getValues("description")}
                onChange={(value) =>
                  setValue("description", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={errors.description?.message}
              />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-5"}>
            <FieldBlock title="SEO məlumatları">
              <FormInput
                label="Meta Başlıq"
                placeholder="Meta Başlıq"
                fieldName="metaTitle"
              />
              <FormInput
                label="Meta məlumat"
                placeholder="Meta məlumat"
                fieldName="metaDescription"
              />
              <FormInput
                label="Meta açar sözlər"
                placeholder="Meta açar sözlər"
                fieldName="metaKeywords"
              />
            </FieldBlock>
            <FieldBlock title="Əsas şəkili daxil et">
              <SingleUploadImage
                label="Yükləmək üçün faylı vurun və ya sürükləyin"
                setFile={(file) => {
                  setUploadedFile(file);

                  const fileId =
                    file && typeof file === "object" && "fileId" in file
                      ? file.fileId?.toString()
                      : "";

                  setValue("imageId", fileId, {
                    shouldValidate: true,
                  });
                }}
                file={uploadedFile}
                isImageCropActive={true}
                isParentFormSubmitted={false}
              />
            </FieldBlock>
            <FieldBlock title="Qalereya şəkillərini daxil et (İstəyə bağlı)">
              <MultiUploadImage
                label="Yükləmək üçün faylları vurun və ya sürükləyin"
                setFiles={setGalleryFiles}
                files={galleryFiles}
                isParentFormSubmitted={isSuccess}
                maxCount={20}
                maxSize={10}
                acceptType="image/*"
              />
            </FieldBlock>
            <div className={"grid grid-cols-2 gap-5 max-w-lg"}>
              <NavigateBtn />
              <CreateButton
                isLoading={isPending}
                disabled={!isDirty || isPending}
              />
            </div>
          </div>
        </FormWrapper>
      </section>
    </>
  );
}
