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
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { useForm } from "react-hook-form";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";
import {
  CreateStrategicGoalsInput,
  createStrategicGoalsSchema,
} from "@/src/schema/strategic-goals.schema";
import { createStrategicGoals } from "@/src/actions/client/strategic-goals.actions";

type OptionTypes = {
  value: string;
  label: string;
};

export default function CreateContent() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const router = useRouter();
  const { success, error } = useMessageStore();
  const [isPending, startTransition] = useTransition();
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta>(null);

  const generalContentForm = useForm<CreateStrategicGoalsInput>({
    resolver: zodResolver(createStrategicGoalsSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      imageId: "",
      locale: locale as CustomLocales,
    },
  });

  const onSubmit = async (data: CreateStrategicGoalsInput) => {
    startTransition(async () => {
      const result = await createStrategicGoals({
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
    pageData?.goals.map((item) => ({
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
              <FormSelect
                label="Seçin"
                placeholder="Seçin"
                fieldName="slug"
                options={pageOptions}
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
