"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import { CustomLocales, FagItem } from "@/src/services/interface";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getFagById, uptadeFag } from "@/src/actions/client/fag.actions";
import { fag_get_list } from "@/src/services/interface/constant";
import { UpdateFagInput, uptadeFagSchema } from "@/src/schema/fag.schema";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";

export default function FagUptadeContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getDataWrapper = async () => {
    const result = await getFagById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as FagItem | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<FagItem>(
    fag_get_list,
    getDataWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      description: existingData?.translations?.[0]?.description || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );
  const fagForm = useForm<UpdateFagInput>({
    mode: "onChange",
    resolver: zodResolver(uptadeFagSchema),
    values: formValues,
  });

  const onSubmit = async (data: UpdateFagInput) => {
    startTransition(async () => {
      const result = await uptadeFag(id as string, data);

      if (result.success) {
        success("Məlumat uğurla yadda saxlandı!");
        fagForm.reset();
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

        <FormWrapper
          form={fagForm}
          onSubmit={fagForm.handleSubmit(onSubmit)}
          className={"grid grid-cols-1 gap-3"}
        >
          <div className={"flex flex-col space-y-4"}>
            <FieldBlock>
              <FormInput
                label="Başlıq"
                placeholder="Başlıq"
                fieldName="title"
              />
              <FormTextArea
                label="Qısa məlumat"
                placeholder="Qısa məlumat"
                fieldName="description"
              />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-4"}>
            <div className={"grid grid-cols-2 gap-4 mt-auto"}>
              <NavigateBtn />
              <SubmitAdminButton
                title={existingData?.translations?.[0]?.title}
                isLoading={isPending}
                disabled={!fagForm.formState.isDirty || isPending}
              />
            </div>
          </div>
        </FormWrapper>
      </section>
    </>
  );
}
