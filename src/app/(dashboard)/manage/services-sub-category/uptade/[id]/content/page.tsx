"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import CustomAdminEditor from "@/src/app/(dashboard)/manage/_components/CreateEditor";
import {
  CustomLocales,
  InfoGenericType,
  ServicesSubCategoryItem,
} from "@/src/services/interface";
import {
  useServerQuery,
  useServerQueryById,
} from "@/src/hooks/useServerActions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import {
  service_category_list,
  service_sub_category_list,
} from "@/src/services/interface/constant";
import {
  getServicesSubCategoryById,
  uptadeServicesSubCategory,
} from "@/src/actions/client/services-sub.actions";
import { parseJSON } from "@/src/utils/checkSlug";
import {
  UpdateServiceSubCategoryInput,
  uptadeServiceSubCategorySchema,
} from "@/src/schema/service-sub.schema";
import { getServicesCategory } from "@/src/actions/client/services.actions";
import { useDropdownOptions } from "@/src/hooks/useDropdownOptions";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";

export default function UpdateContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getDataWrapper = async () => {
    const result = await getServicesSubCategoryById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as ServicesSubCategoryItem | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<ServicesSubCategoryItem>(
    service_sub_category_list,
    getDataWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      servicesCategoryId: existingData?.servicesCategoryId || "",
      description: existingData?.translations?.[0]?.description || "",
      subtitle: existingData?.translations?.[0]?.subtitle || "",
      features: parseJSON<InfoGenericType>(
        existingData?.translations?.[0]?.features
      ),
      metaTitle: existingData?.translations?.[0]?.seo?.metaTitle || "",
      metaDescription:
        existingData?.translations?.[0]?.seo?.metaDescription || "",
      metaKeywords: existingData?.translations?.[0]?.seo?.metaDescription || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );

  const generalForm = useForm<UpdateServiceSubCategoryInput>({
    mode: "onChange",
    resolver: zodResolver(uptadeServiceSubCategorySchema),
    values: formValues,
  });
  const {
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
    getValues,
    reset,
    control,
  } = generalForm;
  const featuresCategory = useFieldArray({
    control,
    name: "features" as any,
  });

  const { data: enumsData } = useServerQuery(
    service_category_list,
    getServicesCategory,
    {
      params: {
        pageSize: 10000,
        locale: locale as CustomLocales,
      },
    }
  );

  
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

  const onSubmit = async (data: UpdateServiceSubCategoryInput) => {
    startTransition(async () => {
      const result = await uptadeServicesSubCategory(id as string, data);

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
              <FormInput
                label="Alt başlıq"
                placeholder="Alt başlıq"
                fieldName="subtitle"
              />

              <FormSelect
                label="Kateqoriyanı seç"
                placeholder="Seçin"
                options={enumOptions}
                fieldName="servicesCategoryId"
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
            <FieldBlock title="Şirkətin güclü tərəfləri">
              <div className="space-y-3 max-w-sm">
                {featuresCategory.fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1 flex flex-col space-y-3">
                      <FormInput
                        fieldName={`features.${index}.title` as const}
                        placeholder={`Başlıq ${index + 1}`}
                      />

                      <FormTextArea
                        fieldName={`features.${index}.description` as const}
                        placeholder={`Qısa məlumat ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => featuresCategory.remove(index)}
                      className="mt-1 px-3 cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="Sil"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    featuresCategory.append({
                      title: "",
                      description: "",
                    })
                  }
                  className="w-full px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Qısa məlumat əlavə et
                </button>
              </div>
            </FieldBlock>
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
