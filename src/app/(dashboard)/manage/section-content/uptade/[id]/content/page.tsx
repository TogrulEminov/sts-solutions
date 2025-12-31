"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import { CustomLocales, SectionContent } from "@/src/services/interface";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import pageData from "@/src/json/main/page.json";
import { getSectionContentById } from "@/src/actions/client/section.actions";
import {
  UpdateSectionContentInput,
  uptadeSectionContentSchema,
} from "@/src/schema/section.schema";
import { section_content_list } from "@/src/services/interface/constant";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";

type OptionTypes = {
  value: string;
  label: string;
};
export default function SectionUptadeContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getDataWrapper = async () => {
    const result = await getSectionContentById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as SectionContent | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<SectionContent>(
    section_content_list,
    getDataWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      description: existingData?.translations?.[0]?.description || "",
      highlightWord: existingData?.translations?.[0]?.highlightWord || "",
      subTitle: existingData?.translations?.[0]?.subTitle || "",
      key: existingData?.key || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );
  const sectionContentForm = useForm<UpdateSectionContentInput>({
    resolver: zodResolver(uptadeSectionContentSchema),
    values: formValues,
  });

  const onSubmit = async (data: UpdateSectionContentInput) => {
    startTransition(async () => {
      console.log(data);
    });
  };
  const pageOptions: OptionTypes[] =
    pageData?.sectionsContent.map((item) => ({
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

        <form
          onSubmit={sectionContentForm.handleSubmit(onSubmit)}
          className={"grid grid-cols-1 gap-3"}
        >
          <div className={"flex flex-col space-y-4"}>
            <FieldBlock>
              <FormInput
                label="Başlıq"
                placeholder="Başlıq"
                fieldName="title"
                required={true}
              />

              <FormSelect
                label="Açar sözünü seçin"
                placeholder="Seçin"
                fieldName="key"
                options={pageOptions}
              />
              <FormTextArea label="Qısa məlumat" fieldName="description" />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-4"}>
            <div className={"grid grid-cols-2 gap-4 mt-auto"}>
              <NavigateBtn />
              <SubmitAdminButton
                title={existingData?.translations?.[0]?.title}
                isLoading={isPending}
                disabled={!sectionContentForm.formState.isDirty || isPending}
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
