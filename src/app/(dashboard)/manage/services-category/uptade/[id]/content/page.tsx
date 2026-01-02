"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import CustomAdminEditor from "@/src/app/(dashboard)/manage/_components/CreateEditor";
import { CustomLocales, ServicesCategoryItem } from "@/src/services/interface";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import {
  getServicesCategoryById,
  uptadeServicesCategory,
} from "@/src/actions/client/services.actions";
import { service_category_list } from "@/src/services/interface/constant";
import {
  UpdateServiceCategoryInput,
  uptadeServiceCategorySchema,
} from "@/src/schema/service.schema";
import FormSwitch from "@/src/ui/FormBuilder/components/FormSwitch/FormSwitch";

export default function UpdateContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getDataWrapper = async () => {
    const result = await getServicesCategoryById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as ServicesCategoryItem | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<ServicesCategoryItem>(
    service_category_list,
    getDataWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      isMain: existingData?.isMain || false,
      description: existingData?.translations?.[0]?.description || "",
      subtitle: existingData?.translations?.[0]?.subtitle || "",
      metaTitle: existingData?.translations?.[0]?.seo?.metaTitle || "",
      metaDescription:
        existingData?.translations?.[0]?.seo?.metaDescription || "",
      metaKeywords: existingData?.translations?.[0]?.seo?.metaDescription || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );

  const generalForm = useForm<UpdateServiceCategoryInput>({
    mode: "onChange",
    resolver: zodResolver(uptadeServiceCategorySchema),
    values: formValues,
  });
  const {
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
    getValues,
    reset,
  } = generalForm;

  const onSubmit = async (data: UpdateServiceCategoryInput) => {
    startTransition(async () => {
      const result = await uptadeServicesCategory(id as string, data);

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
              <FormSwitch
                label="Ana səhifədə görünəcəkmi?"
                fieldName="isMain"
              />
              <FormInput
                label="Alt başlıq"
                placeholder="Alt başlıq"
                fieldName="subtitle"
              />
              <CustomAdminEditor
                title="Qısa məlumat"
                value={getValues("description")}
                onChange={(value) =>
                  setValue("description", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={errors.description?.message}
              />
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
