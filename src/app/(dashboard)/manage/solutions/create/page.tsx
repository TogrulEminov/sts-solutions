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
import { createProjects } from "@/src/actions/client/projects.actions";
import {
  CreateSolutionsInput,
  createSolutionsSchema,
} from "@/src/schema/solutions.schema";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";

export default function CreateContent() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta>(null);
  const [galleryFiles, setGalleryFiles] = useState<UploadedFileMeta[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success, error } = useMessageStore();
  const generalForm = useForm<CreateSolutionsInput>({
    resolver: zodResolver(createSolutionsSchema),
    defaultValues: {
      title: "",
      description: "",
      subTitle: "",
      subDescription: "",
      metaDescription: "",
      metaKeywords: "",
      metaTitle: "",
      imageId: "",
      galleryIds: [],
      locale: locale as CustomLocales,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
    control,
  } = generalForm;
  const problemsFieldArray = useFieldArray({
    control,
    name: "problems",
  });
  const onSubmit = async (data: CreateSolutionsInput) => {
    startTransition(async () => {
      const result = await createProjects({
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
                label="Alt başlıq"
                placeholder="Alt başlıq"
                fieldName="subtitle"
              />
              <FormTextArea
                label="Alt məlumat"
                placeholder="Alt məlumat"
                fieldName="subDescription"
              />

              <CustomAdminEditor
                title="Qısa məlumat"
                value={generalForm.getValues("description")}
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
            <FieldBlock title="Problem həlləri">
              <div className="space-y-4 max-w-2xl">
                {problemsFieldArray.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Problemlər {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => problemsFieldArray.remove(index)}
                        className="px-3 py-1.5 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                        title="Sil"
                      >
                        Sil
                      </button>
                    </div>

                    <div className="space-y-3">
                      <FormInput
                        fieldName={`problems.${index}.title` as const}
                        label="Problem başlığı ̰"
                        placeholder="Problem başlığı"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => problemsFieldArray.append({ title: "" })}
                  className="w-full px-4 py-2 cursor-pointer max-w-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
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
                  Həll əlavə et
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
