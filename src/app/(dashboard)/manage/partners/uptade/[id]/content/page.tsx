"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import { ConnectionItem, CustomLocales } from "@/src/services/interface";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getPartnersById,
  updatePartners,
} from "@/src/actions/client/partners.actions";
import {
  UpdatePartnersInput,
  uptadePartnersSchema,
} from "@/src/schema/partners.schema";
import { partners_main_list } from "@/src/services/interface/constant";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";

export default function PartnersUptadeContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getCategoryWrapper = async () => {
    const result = await getPartnersById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as ConnectionItem | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<ConnectionItem>(
    partners_main_list,
    getCategoryWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      url: existingData?.url || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<UpdatePartnersInput>({
    resolver: zodResolver(uptadePartnersSchema),
    values: formValues,
  });

  const onSubmit = async (data: UpdatePartnersInput) => {
    startTransition(async () => {
      const result = await updatePartners(id as string, data);

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

        <form
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
                label="Partnyor əlaqə linki"
                placeholder="Partnyor əlaqə linki"
                fieldName="url"
              />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-4"}>
            <div className={"grid grid-cols-2 gap-4 mt-auto"}>
              <NavigateBtn />
              <SubmitAdminButton
                title={existingData?.translations?.[0]?.title}
                isLoading={isPending}
                disabled={!isDirty || isPending}
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
