"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import SingleUploadImage from "@/src/app/(dashboard)/manage/_components/upload/single";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import CreateButton from "@/src/app/(dashboard)/manage/_components/createButton";
import pageData from "@/src/json/main/page.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomLocales, UploadedFileMeta } from "@/src/services/interface";
import {
  CreateCategoryInput,
  createCategorySchema,
} from "@/src/schema/category.schema";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { createCategory } from "@/src/actions/client/category.actions";
import { useFieldArray, useForm } from "react-hook-form";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";

type OptionTypes = {
  value: string;
  label: string;
};

export default function CreateCategories() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const router = useRouter();
  const { success, error } = useMessageStore();
  const [isPending, startTransition] = useTransition();
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta>(null);

  const generalContentForm = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      subTitle:"",
      metaTitle: "",
      metaDescription: "",
      highlight: "",
      metaKeywords: "",
      imageId: "",
      features: [{ title: "", count: "", suffix: "" }],
      locale: locale as CustomLocales,
    },
  });
  const { control } = generalContentForm;
  const { fields, append, remove } = useFieldArray<CreateCategoryInput>({
    control,
    name: "features" as any,
  });
  const onSubmit = async (data: CreateCategoryInput) => {
    startTransition(async () => {
      const result = await createCategory({
        ...data,
        imageId: uploadedFile?.fileId?.toString() || "",
      });

      if (result.success) {
        success("Məlumat uğurla yadda saxlandı!");

        generalContentForm.reset();
        setUploadedFile(null);

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

  const pageOptions: OptionTypes[] =
    pageData?.categories.map((item) => ({
      value: item.value,
      label: item.label,
    })) || [];

  return (
    <>
      <section className={"flex flex-col gap-4 mb-5"}>
        <h1 className="font-medium text-[#171717] text-3xl mb-8">
          {locale === "az"
            ? "Azərbaycan dilində daxil  et"
            : locale === "en"
            ? "İngilis dilində daxil et"
            : "Rus dilində daxil et"}
        </h1>
        <FormWrapper
          form={generalContentForm}
          onSubmit={generalContentForm.handleSubmit(onSubmit)}
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
                fieldName="subTitle"
              />
              <FormInput
                label="Aktiv söz"
                placeholder="Aktiv söz"
                fieldName="highlight"
              />
              <FormSelect
                label="Səhifəni seçin"
                placeholder="Səhifəni seçin"
                fieldName="slug"
                options={pageOptions}
              />
              <FormTextArea label="Qısa məlumat" fieldName="description" />
            </FieldBlock>
            {/* Features Section */}
            <FieldBlock title="Teqler">
              <div className="space-y-3 max-w-sm">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1 flex flex-col space-y-3">
                      <FormInput
                        fieldName={`features.${index}.title` as const}
                        placeholder={`Başlıq ${index + 1}`}
                      />
                      <FormInput
                        fieldName={`features.${index}.count` as const}
                        placeholder={`Say ${index + 1}`}
                      />
                      <FormInput
                        fieldName={`features.${index}.suffix` as const}
                        placeholder={`Suffix ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-1   px-3 cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Sil"
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
                  onClick={() => append({ title: "" })}
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
                  Xüsusiyyət əlavə et
                </button>
              </div>
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

                  generalContentForm.setValue("imageId", fileId, {
                    shouldValidate: true,
                  });
                }}
                file={uploadedFile}
                isImageCropActive={true}
                isParentFormSubmitted={false}
              />
            </FieldBlock>
            <div className={"grid grid-cols-2 gap-5"}>
              <NavigateBtn />
              <CreateButton
                isLoading={isPending}
                disabled={!generalContentForm.formState.isDirty || isPending}
              />
            </div>
          </div>
        </FormWrapper>
      </section>
    </>
  );
}
