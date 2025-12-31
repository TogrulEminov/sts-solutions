"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import { CustomLocales, Employee } from "@/src/services/interface";
import {
  useServerQuery,
  useServerQueryById,
} from "@/src/hooks/useServerActions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  UpdateEmployeeInput,
  uptadeEmployeeSchema,
} from "@/src/schema/employee.schema";
import {
  getEmployeeById,
  uptadeEmployee,
} from "@/src/actions/client/employe.actions";
import { getPositionData } from "@/src/actions/client/position.actions";
import { useDropdownOptions } from "@/src/hooks/useDropdownOptions";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInputInteger from "@/src/ui/FormBuilder/components/FormInputInteger/FormInputInteger";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import { employee_list } from "@/src/services/interface/constant";
import FormPhone from "@/src/ui/FormBuilder/components/FormPhone";

export default function UpdateContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getDataWrapper = async () => {
    const result = await getEmployeeById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as Employee | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<Employee>(
    employee_list,
    getDataWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      orderNumber: existingData?.orderNumber || undefined,
      email: existingData?.email || "",
      phone: existingData?.phone || "",
      positionId: String(existingData?.positionId),
      description: existingData?.translations?.[0]?.description || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );

  const generalForm = useForm<UpdateEmployeeInput>({
    mode: "onChange",
    resolver: zodResolver(uptadeEmployeeSchema),
    values: formValues,
  });
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = generalForm;
  const onSubmit = async (data: UpdateEmployeeInput) => {
    startTransition(async () => {
      const result = await uptadeEmployee(id as string, data);

      if (result.success) {
        success("Məlumat uğurla yadda saxlandı!");
        reset();
        router.back();
        router.refresh();
      } else {
        error(result.error || "Məlumat göndərilərkən xəta baş verdi.");
      }
    });
  };
  const { data: enumsData } = useServerQuery("position", getPositionData, {
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
      <section className={"flex flex-col gap-4 mb-2"}>
        <h1 className={"text-2xl font-medium text-[#171717] mb-8"}>
          {locale === "az"
            ? "Azərbaycan dilində daxil  et"
            : locale === "en"
            ? "İngilis dilində daxil et"
            : "Rus dilində daxil et"}
        </h1>

        <FormWrapper
          form={generalForm}
          onSubmit={handleSubmit(onSubmit)}
          className={"grid grid-cols-1 gap-3"}
        >
          <div className={"flex flex-col space-y-4"}>
            <FieldBlock>
              <FormInput
                label="Başlıq"
                placeholder="Başlıq"
                fieldName="title"
              />
              <FormInput
                label="E-mail ünvanı"
                placeholder="E-mail ünvanı"
                type="email"
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
          <div className={"flex flex-col space-y-4"}>
            <div className={"grid grid-cols-2 gap-4 mt-auto max-w-lg"}>
              <NavigateBtn />
              <SubmitAdminButton
                title={existingData?.translations?.[0]?.title}
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
