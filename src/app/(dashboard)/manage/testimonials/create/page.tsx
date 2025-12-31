"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import SingleUploadImage from "@/src/app/(dashboard)/manage/_components/upload/single";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import CreateButton from "@/src/app/(dashboard)/manage/_components/createButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomLocales, UploadedFileMeta } from "@/src/services/interface";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { useForm } from "react-hook-form";
import {
  CreateTestimonialsInput,
  createTestimonialsSchema,
} from "@/src/schema/testimonials.schema";
import { createTestimonials } from "@/src/actions/client/testimonials.actions";
import FormWrapper from "@/src/globalElements/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/globalElements/FormBuilder/components/FormInput/FormInput";
import FormTextArea from "@/src/globalElements/FormBuilder/components/FormTextArea/FormTextArea";

export default function CreateTestimonials() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const router = useRouter();
  const { success, error } = useMessageStore();
  const [isPending, startTransition] = useTransition();
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta>(null);

  const generalForm = useForm<CreateTestimonialsInput>({
    resolver: zodResolver(createTestimonialsSchema),
    defaultValues: {
      title: "",
      description: "",
      imageId: "",
      locale: locale as CustomLocales,
    },
  });

  const { reset, formState, handleSubmit, setValue } = generalForm;
  const { isDirty } = formState;
  const onSubmit = async (data: CreateTestimonialsInput) => {
    startTransition(async () => {
      const result = await createTestimonials({
        ...data,
        imageId: uploadedFile?.fileId?.toString() || "",
      });

      if (result.success) {
        success("Məlumat uğurla yadda saxlandı!");
        reset();
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

              <FormTextArea label="Qısa məlumat" fieldName="description" />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-5"}>
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
