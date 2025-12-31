"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SingleUploadImage from "@/src/app/(dashboard)/manage/_components/upload/single";
import React, { useState, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import CreateButton from "@/src/app/(dashboard)/manage/_components/createButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomLocales, UploadedFileMeta } from "@/src/services/interface";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { useForm } from "react-hook-form";
import { useServerQuery } from "@/src/hooks/useServerActions";
import { getPositionData } from "@/src/actions/client/position.actions";
import { useDropdownOptions } from "@/src/hooks/useDropdownOptions";
import {
  CreateEmployeeInput,
  createEmployeeSchema,
} from "@/src/schema/employee.schema";
import { createEmployee } from "@/src/actions/client/employe.actions";
import { position_list } from "@/src/services/interface/constant";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormInputInteger from "@/src/ui/FormBuilder/components/FormInputInteger/FormInputInteger";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormPhone from "@/src/ui/FormBuilder/components/FormPhone";

export default function CreateContent() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta>(null);

  const { success, error } = useMessageStore();
  const generalForm = useForm<CreateEmployeeInput>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      title: "",
      description: "",
      orderNumber: 0,
      positionId: undefined,
      email: "",
      phone: "",
      locale: locale as CustomLocales,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    setValue,
    reset,
  } = generalForm;
  const onSubmit = async (data: CreateEmployeeInput) => {
    startTransition(async () => {
      const result = await createEmployee({
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

  const { data: enumsData } = useServerQuery(position_list, getPositionData, {
    params: {
      pageSize: 10000,
      locale: locale as CustomLocales,
    },
  });

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
                label="E-mail ünvanı"
                placeholder="E-mail ünvanı"
                type={"email"}
                fieldName="email"
              />
              <FormPhone
                label="Telefon"
                placeholder="Telefon"
                fieldName="phone"
              />
              <FormInputInteger
                label="Sıra nömrəsi"
                placeholder="Sıra nömrəsi"
                type="number"
                min={0}
                fieldName="orderNumber"
              />

              <FormSelect
                label="Vəzifəni seç"
                placeholder="Seçin"
                options={enumOptions}
                fieldName="positionId"
              />
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
