"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import { CustomLocales, IContactInformation } from "@/src/services/interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useTransition } from "react";
import { useMessageStore } from "@/src/hooks/useMessageStore";

import {
  UpsertContactInput,
  upsertContactSchema,
} from "@/src/schema/contact.schema";
import { upsertContact } from "@/src/actions/client/contact.actions";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";
import FormPhone from "@/src/ui/FormBuilder/components/FormPhone";

interface Props {
  existingData: IContactInformation | undefined;
  refetch: () => void;
}

export default function Content({ existingData, refetch }: Props) {
  const searchParams = useSearchParams();
  const { success, error } = useMessageStore();
  const locale = searchParams?.get("locale") ?? "az";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const formValues = useMemo(
    () => ({
      phone: existingData?.phone ?? "",
      phoneSecond: existingData?.phoneSecond ?? "",
      adressLink: existingData?.adressLink ?? "",
      email: existingData?.email ?? "",
      latitude: (existingData?.latitude as string | undefined) ?? undefined,
      longitude: (existingData?.longitude as string | undefined) ?? undefined,
      whatsapp: existingData?.whatsapp ?? "",
      tag: existingData?.translations?.[0]?.tag ?? "",
      adress: existingData?.translations?.[0]?.adress ?? "",
      title: existingData?.translations?.[0]?.title ?? "",
      hightlightWord: existingData?.translations?.[0]?.hightlightWord ?? "",
      about: existingData?.translations?.[0]?.about ?? "",
      description: existingData?.translations?.[0]?.description ?? "",
      workHours: existingData?.translations?.[0]?.workHours ?? "",
      support: existingData?.translations?.[0]?.support ?? "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );
  const generalForm = useForm<UpsertContactInput>({
    resolver: zodResolver(upsertContactSchema),
    mode: "onChange",
    values: formValues,
  });
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = generalForm;
  const onSubmit = handleSubmit(async (data: UpsertContactInput) => {
    startTransition(async () => {
      const result = await upsertContact(data);

      if (result.success) {
        success("Məlumat uğurla yadda saxlandı!");
        reset();
        router.refresh();
        refetch();
      } else {
        error(result.error || "Məlumat göndərilərkən xəta baş verdi.");
      }
    });
  });

  return (
    <section className="flex flex-col gap-4 mb-2">
      <h1 className="text-2xl font-medium text-[#171717] mb-8">
        {locale === "az"
          ? "Azərbaycan dilində daxil et"
          : locale === "en"
          ? "İngilis dilində daxil et"
          : "Rus dilində daxil et"}
      </h1>

      <FormWrapper
        form={generalForm}
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-3"
      >
        <div className="flex flex-col space-y-4">
          <FieldBlock title="Tərcümə ediləcək form məlumatları">
            <FormInput label="Başlıq" placeholder="Başlıq" fieldName="title" />

            <FormInput
              label="Nişan (Tag)"
              placeholder="Nişan"
              fieldName="tag"
            />

            <FormInput
              label="İş saatları"
              placeholder="İş saatlarını daxil edin"
              fieldName="workHours"
            />

            <FormInput
              label="Ünvan"
              placeholder="Ünvanı daxil edin"
              fieldName="adress"
            />

            <FormInput
              label="Dəstək məlumatı"
              placeholder="Dəstək məlumatını daxil edin"
              fieldName="support"
            />
            <FormTextArea
              label="Footer  məlumat"
              placeholder="Footer  məlumat"
              fieldName="about"
            />
            <FormTextArea
              label="Qısa məlumat"
              placeholder="Qısa məlumat"
              fieldName="description"
            />
          </FieldBlock>
          <FieldBlock>
            <FormInput
              label="Latitude (En dairəsi)"
              placeholder="40.4093"
              type="text"
              step="any"
              fieldName="latitude"
            />
            <FormInput
              label="Longitude (Uzunluq dairəsi)"
              placeholder="49.8671"
              type="text"
              step="any"
              fieldName="longitude"
            />
            <FormPhone
              label="Telefon"
              fieldName="phone"
              placeholder="+994 XX XXX XX XX"
            />
            <FormPhone
              fieldName="phoneSecond"
              label="Telefon (optional)"
              placeholder="+994 XX XXX XX XX (optional)"
            />
            <FormPhone
              placeholder="+994 XX XXX XX XX"
              label="Whatsapp nömrəsi"
              fieldName="whatsapp"
            />
            <FormInput
              label="Email"
              placeholder="info@example.com"
              type="email"
              fieldName="email"
            />
            <FormInput
              type={"url"}
              label="Ünvan linki"
              placeholder="Google Maps linki"
              fieldName="adressLink"
            />
          </FieldBlock>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4 mt-auto max-w-lg">
            <NavigateBtn />
            <SubmitAdminButton
              title={existingData ? "Yenilə" : "Əlavə et"}
              isLoading={isPending}
              disabled={!isDirty || isPending}
            />
          </div>
        </div>
      </FormWrapper>
    </section>
  );
}
