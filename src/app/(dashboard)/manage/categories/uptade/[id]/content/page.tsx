"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import pageData from "@/src/json/main/page.json";
import {
  CategoryItem,
  CustomLocales,
  InfoGenericType,
} from "@/src/services/interface";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import {
  getCategoriesById,
  uptadeCategory,
} from "@/src/actions/client/category.actions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  UpdateCategoryInput,
  uptadeCategorySchema,
} from "@/src/schema/category.schema";
import { categories_content_list } from "@/src/services/interface/constant";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import { parseJSON } from "@/src/utils/checkSlug";
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
    const result = await getCategoriesById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as CategoryItem | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<CategoryItem>(
    categories_content_list,
    getCategoryWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      description: existingData?.translations?.[0]?.description || "",
      slug: existingData?.slug || "",
      metaTitle: existingData?.translations?.[0]?.seo.metaTitle || "",
      metaDescription:
        existingData?.translations?.[0]?.seo.metaDescription || "",
      metaKeywords: existingData?.translations?.[0]?.seo.metaKeywords || "",
      locale: locale as CustomLocales,
      tags: parseJSON<InfoGenericType>(
        existingData?.translations?.[0]?.features
      ),
    }),
    [existingData, locale]
  );
  const generalContentForm = useForm<UpdateCategoryInput>({
    mode: "onChange",
    resolver: zodResolver(uptadeCategorySchema),
    values: formValues,
  });
  const { control } = generalContentForm;
  const { fields, append, remove } = useFieldArray<UpdateCategoryInput>({
    control,
    name: "features" as any,
  });
  const onSubmit = async (data: UpdateCategoryInput) => {
    startTransition(async () => {
      const result = await uptadeCategory(id as string, {
        ...data,
      });

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
    pageData?.categories.map((item) => ({
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
                placeholder="Səhifəni seçin"
                fieldName="slug"
                options={pageOptions}
              />
              <FormTextArea label="Qısa məlumat" fieldName="description" />
            </FieldBlock>
            {/* Features Section */}
            <FieldBlock title="Teqler">
              <div className="space-y-3 max-w-sm">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1">
                      <FormInput
                        fieldName={`features.${index}.title` as const}
                        placeholder={`Teq ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-1   px-3 cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Sil"
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
                  onClick={() => append({ title: "" })}
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
                  Xüsusiyyət əlavə et
                </button>
              </div>
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
