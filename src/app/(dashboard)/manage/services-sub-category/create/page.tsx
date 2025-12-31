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
import { useFieldArray, useForm } from "react-hook-form";
import MultiUploadImage from "@/src/app/(dashboard)/manage/_components/upload/multi";
import CustomAdminEditor from "@/src/app/(dashboard)/manage/_components/CreateEditor";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import {
  CreateServiceSubCategoryInput,
  createServiceSubCategorySchema,
} from "@/src/schema/service-sub.schema";
import { createServicesSubCategory } from "@/src/actions/client/services-sub.actions";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";
import { useServerQuery } from "@/src/hooks/useServerActions";
import { service_category_list } from "@/src/services/interface/constant";
import { getServicesCategory } from "@/src/actions/client/services.actions";
import { useDropdownOptions } from "@/src/hooks/useDropdownOptions";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";

export default function CreateContent() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta>(null);
  const [galleryFiles, setGalleryFiles] = useState<UploadedFileMeta[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success, error } = useMessageStore();
  const generalForm = useForm<CreateServiceSubCategoryInput>({
    resolver: zodResolver(createServiceSubCategorySchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      imageId: "",
      servicesCategoryId: "",
      galleryIds: [],
      metaDescription: "",
      metaKeywords: "",
      metaTitle: "",
      features: [],
      locale: locale as CustomLocales,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
    getValues,
    control,
  } = generalForm;

  const servicesCategory = useFieldArray({
    control,
    name: "servicesCategory" as any,
  });

  const { data: enumsData } = useServerQuery(
    service_category_list,
    getServicesCategory,
    {
      params: {
        pageSize: 10000,
        locale: locale as CustomLocales,
      },
    }
  );
  const enumOptions = useDropdownOptions(
    enumsData?.data?.flatMap((item) =>
      item.translations.map((tr) => ({
        ...tr,
        value: tr.documentId,
        label: tr.title,
      }))
    ) || [],
    "value",
    "label"
  );
  const onSubmit = async (data: CreateServiceSubCategoryInput) => {
    startTransition(async () => {
      const result = await createServicesSubCategory({
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
              <FormSelect
                label="Kateqoriyanı seç"
                placeholder="Seçin"
                options={enumOptions}
                fieldName="servicesCategoryId"
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
            <FieldBlock title="Şirkətin güclü tərəfləri">
              <div className="space-y-3 max-w-sm">
                {servicesCategory.fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1">
                      <FormInput
                        fieldName={`features.${index}.title` as const}
                        placeholder={`Başlıq ${index + 1}`}
                      />

                      <FormTextArea
                        fieldName={`features.${index}.description` as const}
                        placeholder={`Qısa məlumat ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => servicesCategory.remove(index)}
                      className="mt-1 px-3 cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="Sil"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    servicesCategory.append({
                      title: "",
                      description: "",
                    })
                  }
                  className="w-full px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Qısa məlumat əlavə et
                </button>
              </div>
            </FieldBlock>
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
