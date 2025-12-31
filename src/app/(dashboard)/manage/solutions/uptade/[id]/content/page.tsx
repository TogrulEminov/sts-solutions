"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import {
  CustomLocales,
  InfoGenericType,
  SolutionsItem,
} from "@/src/services/interface";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import CustomAdminEditor from "@/src/app/(dashboard)/manage/_components/CreateEditor";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { solutions_list } from "@/src/services/interface/constant";
import {
  getSolutionsById,
  uptadeSolutions,
} from "@/src/actions/client/solutions.actions";
import { parseJSON } from "@/src/utils/checkSlug";
import {
  UpdateSolutionsInput,
  uptadeSolutionsSchema,
} from "@/src/schema/solutions.schema";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";

export default function UpdateContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getDataWrapper = async () => {
    const result = await getSolutionsById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as SolutionsItem | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<SolutionsItem>(
    solutions_list,
    getDataWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      description: existingData?.translations?.[0]?.description || "",
      subTitle: existingData?.translations?.[0]?.subTitle || "",
      subDescription: existingData?.translations?.[0]?.subDescription || "",
      problems: parseJSON<InfoGenericType>(
        existingData?.translations?.[0]?.problems
      ),
      metaTitle: existingData?.translations?.[0]?.seo?.metaTitle || "",
      metaDescription:
        existingData?.translations?.[0]?.seo?.metaDescription || "",
      metaKeywords: existingData?.translations?.[0]?.seo?.metaDescription || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );

  const generalForm = useForm<UpdateSolutionsInput>({
    mode: "onChange",
    resolver: zodResolver(uptadeSolutionsSchema),
    values: formValues,
  });
  const {
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
    reset,
    control,
  } = generalForm;
  const problemsFieldArray = useFieldArray({
    control,
    name: "problems",
  });
  const onSubmit = async (data: UpdateSolutionsInput) => {
    startTransition(async () => {
      const result = await uptadeSolutions(id as string, data);

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

              <CustomAdminEditor
                title="Qısa məlumat"
                value={generalForm.getValues("description")}
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
            <FieldBlock title="Problem həlləri">
              <div className="space-y-4 max-w-2xl">
                {problemsFieldArray.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Problemlər {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => problemsFieldArray.remove(index)}
                        className="px-3 py-1.5 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                        title="Sil"
                      >
                        Sil
                      </button>
                    </div>

                    <div className="space-y-3">
                      <FormInput
                        fieldName={`problems.${index}.title` as const}
                        label="Problem başlığı ̰"
                        placeholder="Problem başlığı"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => problemsFieldArray.append({ title: "" })}
                  className="w-full px-4 py-2 cursor-pointer max-w-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
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
                  Həll əlavə et
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
