"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import {
  CountGenericType,
  CustomLocales,
  IAbout,
  InfoGenericType,
} from "@/src/services/interface";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useTransition } from "react";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { parseJSON } from "@/src/utils/checkSlug";
import { UpsertHomeAboutInput } from "@/src/schema/about-home.schema";
import { upsertHomeAbout } from "@/src/actions/client/about-home.actions";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import CustomAdminEditor from "@/src/app/(dashboard)/manage/_components/CreateEditor";
import {
  UpsertAboutMainInput,
  upsertAboutMainSchema,
} from "@/src/schema/about-main.schema";
interface Props {
  existingData: IAbout | undefined;
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
      title: existingData?.translations?.[0]?.title || "",
      description: existingData?.translations?.[0]?.description || "",
      subTitle: existingData?.translations?.[0]?.subTitle || "",
      subDescription: existingData?.translations?.[0]?.subDescription || "",
      experienceYears: existingData?.experienceYears || 10,
      experienceDescription:
        existingData?.translations?.[0]?.experienceDescription || "",
      teamDescription: existingData?.translations?.[0]?.teamDescription || "",
      locale: locale as CustomLocales,
      statistics: parseJSON<CountGenericType>(
        existingData?.translations?.[0]?.statistics
      ),
      sectors: parseJSON<InfoGenericType>(
        existingData?.translations?.[0]?.sectors
      ),
      purpose: parseJSON<InfoGenericType>(
        existingData?.translations?.[0]?.sectors
      ),
    }),
    [existingData, locale]
  );

  const generalFormInput = useForm<UpsertAboutMainInput>({
    resolver: zodResolver(upsertAboutMainSchema),
    mode: "onChange",
    values: formValues,
  });
  const { control, formState, handleSubmit, reset, getValues, setValue } =
    generalFormInput;
  const { isDirty, errors } = formState;
  const sectorsFieldArray = useFieldArray({
    control,
    name: "sectors",
  });
  const statisticsFieldArray = useFieldArray({
    control,
    name: "statistics" as any,
  });
  const purposeFieldArray = useFieldArray({
    control,
    name: "purpose" as any,
  });

  const onSubmit = handleSubmit(async (data: UpsertHomeAboutInput) => {
    startTransition(async () => {
      const result = await upsertHomeAbout(data);
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
        form={generalFormInput}
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-3"
      >
        <div className="flex flex-col space-y-4">
          <FieldBlock>
            <FormInput label="Başlıq" placeholder="Başlıq" fieldName="title" />
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
          <FieldBlock>
            <FormInput
              label="Alt başlıq"
              placeholder="Alt başlıq"
              fieldName="subTitle"
            />

            <CustomAdminEditor
              title="Alt məlumat"
              value={getValues("subDescription")}
              onChange={(value) =>
                setValue("subDescription", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors.description?.message}
            />
          </FieldBlock>

          <FieldBlock>
            <FormInput
              label="Təcrübə"
              placeholder="Təcrübə"
              fieldName="experienceYears"
            />
            <FormInput
              label="Təcrübə məlumat"
              placeholder="illik təcrübə"
              fieldName="experienceDescription"
            />
          </FieldBlock>
          <FieldBlock>
            <CustomAdminEditor
              title="Komanda məlumat"
              value={getValues("teamDescription")}
              onChange={(value) =>
                setValue("teamDescription", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors.teamDescription?.message}
            />
          </FieldBlock>
        </div>

        <div className="flex flex-col space-y-4">
          {/* Features Section */}
          <FieldBlock title="Statistika">
            <div className="space-y-3 max-w-sm">
              {statisticsFieldArray.fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="flex-1">
                    <FormInput
                      fieldName={`statistics.${index}.title` as const}
                      placeholder={`Statistics ${index + 1}`}
                    />
                    <FormInput
                      fieldName={`statistics.${index}.suffix` as const}
                      placeholder={`Statistics ${index + 1}`}
                    />
                    <FormInput
                      fieldName={`statistics.${index}.count` as const}
                      placeholder={`Statistics ${index + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => statisticsFieldArray.remove(index)}
                    className="mt-1 px-3 cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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
                onClick={() =>
                  statisticsFieldArray.append({
                    title: "",
                    count: "",
                    suffix: "",
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
                Xüsusiyyət əlavə et
              </button>
            </div>
          </FieldBlock>
          <FieldBlock title="Məqsədimiz">
            <div className="space-y-3 max-w-sm">
              {purposeFieldArray.fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="flex-1">
                    <FormInput
                      fieldName={`purpose.${index}.title` as const}
                      placeholder={`Statistics ${index + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => purposeFieldArray.remove(index)}
                    className="mt-1 px-3 cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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
                onClick={() =>
                  purposeFieldArray.append({
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
                Məqsəd əlavə et
              </button>
            </div>
          </FieldBlock>

          {/* Advantages Section */}
          <FieldBlock title="Sektorlarımız">
            <div className="space-y-4 max-w-2xl">
              {sectorsFieldArray.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Sektor {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => sectorsFieldArray.remove(index)}
                      className="px-3 py-1.5 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      title="Sil"
                    >
                      Sil
                    </button>
                  </div>

                  <div className="space-y-3">
                    <FormInput
                      fieldName={`sectors.${index}.title` as const}
                      label="Sektor başlığı ̰"
                      placeholder="Sektor başlığı"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => sectorsFieldArray.append({ title: "" })}
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
                Üstünlük əlavə et
              </button>
            </div>
          </FieldBlock>

          <div className="grid grid-cols-2 gap-4 mt-auto max-w-lg">
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
  );
}
