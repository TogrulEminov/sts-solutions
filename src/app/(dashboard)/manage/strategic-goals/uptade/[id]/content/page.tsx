"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import pageData from "@/src/json/main/page.json";
import { StrategicItem, CustomLocales } from "@/src/services/interface";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import { uptadeCategory } from "@/src/actions/client/category.actions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { goals_content_list } from "@/src/services/interface/constant";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";
import {
  UpdateStrategicGoalsInput,
  uptadeStrategicGoalsSchema,
} from "@/src/schema/strategic-goals.schema";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import { getStrategicGoalsById } from "@/src/actions/client/strategic-goals.actions";
type OptionTypes = {
  value: string;
  label: string;
};
export default function CategriesUptadeContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getCategoryWrapper = async () => {
    const result = await getStrategicGoalsById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as StrategicItem | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<StrategicItem>(
    goals_content_list,
    getCategoryWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      description: existingData?.translations?.[0]?.description || "",
      slug: existingData?.slug || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );
  const generalContentForm = useForm<UpdateStrategicGoalsInput>({
    mode: "onChange",
    resolver: zodResolver(uptadeStrategicGoalsSchema),
    values: formValues,
  });

  const onSubmit = async (data: UpdateStrategicGoalsInput) => {
    startTransition(async () => {
      const result = await uptadeCategory(id as string, data);

      if (result.success) {
        success("Məlumat uğurla yadda saxlandı!");

        generalContentForm.reset();

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
      <section className={"flex flex-col gap-4 mb-2"}>
        <h1 className={"text-2xl font-medium text-[#171717] mb-8"}>
          {locale === "az"
            ? "Azərbaycan dilində daxil  et"
            : locale === "en"
            ? "İngilis dilində daxil et"
            : "Rus dilində daxil et"}
        </h1>

        <FormWrapper
          form={generalContentForm}
          onSubmit={generalContentForm.handleSubmit(onSubmit)}
          className={"grid grid-cols-1 gap-3"}
        >
          <div className={"flex flex-col space-y-4"}>
            <FieldBlock>
              <FormInput
                label="Başlıq"
                placeholder="Başlıq"
                fieldName="title"
              />
              <FormSelect
                label="Səhifəni seçin"
                placeholder="Seçin"
                fieldName="slug"
                options={pageOptions}
              />
              <FormTextArea label="Qısa məlumat" fieldName="description" />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-4"}>
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
            <div className={"grid grid-cols-2 gap-4 mt-auto"}>
              <NavigateBtn />
              <SubmitAdminButton
                title={existingData?.translations?.[0]?.title}
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
