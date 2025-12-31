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
  Projects,
  ServiceItem,
} from "@/src/services/interface";
import {
  useServerQuery,
  useServerQueryById,
} from "@/src/hooks/useServerActions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  UpdateProjectsInput,
  uptadeProjectsSchema,
} from "@/src/schema/projects.schema";

import { useDropdownOptions } from "@/src/hooks/useDropdownOptions";
import FormInput from "@/src/globalElements/FormBuilder/components/FormInput/FormInput";
import FormWrapper from "@/src/globalElements/FormBuilder/FormWrapper/FormWrapper";
import FormSelect from "@/src/globalElements/FormBuilder/components/FormSelect/FormSelect";
import FormSwitch from "@/src/globalElements/FormBuilder/components/FormSwitch/FormSwitch";
import FormDatePicker from "@/src/globalElements/FormBuilder/components/FormDatePicker/FormDatePicker";
import {
  expertise_list,
  service_list,
} from "@/src/services/interface/constant";
import { getExpertiseData } from "@/src/actions/client/expertise.actions";
import { parseJSON } from "@/src/utils/checkSlug";
import {
  getServicesById,
  uptadeServices,
} from "@/src/actions/client/services.actions";
import {
  UpdateServiceInput,
  uptadeServiceSchema,
} from "@/src/schema/service.schema";
import FormTextArea from "@/src/globalElements/FormBuilder/components/FormTextArea/FormTextArea";

export default function UpdateContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getDataWrapper = async () => {
    const result = await getServicesById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as ServiceItem | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<ServiceItem>(
    service_list,
    getDataWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      title: existingData?.translations?.[0]?.title || "",
      description: existingData?.translations?.[0]?.description || "",
      highlight: existingData?.translations?.[0]?.highlight || "",
      expertiseId: existingData?.expertiseId || "",
      metaTitle: existingData?.translations?.[0]?.seo?.metaTitle || "",
      metaDescription:
        existingData?.translations?.[0]?.seo?.metaDescription || "",
      metaKeywords: existingData?.translations?.[0]?.seo?.metaDescription || "",
      ourStrengths: parseJSON<InfoGenericType>(
        existingData?.translations?.[0]?.ourStrengths
      ),
      steps: parseJSON<InfoGenericType>(existingData?.translations?.[0]?.steps),
      offerings: parseJSON<InfoGenericType>(
        existingData?.translations?.[0]?.offerings
      ),
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );

  const generalForm = useForm<UpdateServiceInput>({
    mode: "onChange",
    resolver: zodResolver(uptadeServiceSchema),
    values: formValues,
  });
  const {
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
    watch,
    reset,
    control,
  } = generalForm;
  const description = watch("description");
  const strengths = useFieldArray({
    control,
    name: "ourStrengths" as any,
  });
  const steps = useFieldArray({
    control,
    name: "ourStrengths" as any,
  });
  const offerings = useFieldArray({
    control,
    name: "ourStrengths" as any,
  });
  const onSubmit = async (data: UpdateServiceInput) => {
    startTransition(async () => {
      const result = await uptadeServices(id as string, data);

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
  const { data: enumsData } = useServerQuery(expertise_list, getExpertiseData, {
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
                label="Ünvan"
                placeholder="Ünvan"
                fieldName="address"
              />
              <FormInput
                label="Aktiv söz"
                placeholder="Aktiv söz"
                fieldName="highlight"
              />
              <FormDatePicker
                label="Tarix"
                placeholder="Tarix"
                fieldName="eventDate"
              />
              <FormSwitch label="Tətbir statusu" fieldName="eventHistory" />

              <FormSelect
                label="Kateqoriyanı seç"
                placeholder="Seçin"
                options={enumOptions}
                fieldName="expertiseId"
              />
              <CustomAdminEditor
                title="Qısa məlumat"
                value={description}
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
                {strengths.fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1">
                      <FormInput
                        fieldName={`ourStrengths.${index}.title` as const}
                        placeholder={`Başlıq ${index + 1}`}
                      />

                      <FormTextArea
                        fieldName={`ourStrengths.${index}.description` as const}
                        placeholder={`Qısa məlumat ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => strengths.remove(index)}
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
                    strengths.append({
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
            <FieldBlock title="İş prosesləri">
              <div className="space-y-3 max-w-sm">
                {steps.fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1">
                      <FormInput
                        fieldName={`steps.${index}.title` as const}
                        placeholder={`Başlıq ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => steps.remove(index)}
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
                    steps.append({
                      title: "",
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
            <FieldBlock title="Təkliflərimiz">
              <div className="space-y-3 max-w-sm">
                {offerings.fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1">
                      <FormInput
                        fieldName={`offerings.${index}.title` as const}
                        placeholder={`Başlıq ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => offerings.remove(index)}
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
                    offerings.append({
                      title: "",
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
