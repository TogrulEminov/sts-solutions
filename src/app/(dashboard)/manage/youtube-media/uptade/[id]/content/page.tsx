"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import SubmitAdminButton from "@/src/app/(dashboard)/manage/_components/submitBtn";
import { CustomLocales, YoutubeItems } from "@/src/services/interface";
import { useServerQueryById } from "@/src/hooks/useServerActions";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getYoutubeById,
  updateYoutube,
} from "@/src/actions/client/youtube.actions";
import {
  UpdateYoutubeInput,
  uptadeYoutubeSchema,
} from "@/src/schema/youtube.schema";
import { youtube_main_list } from "@/src/services/interface/constant";
import FormWrapper from "@/src/globalElements/FormBuilder/FormWrapper/FormWrapper";
import FormTextArea from "@/src/globalElements/FormBuilder/components/FormTextArea/FormTextArea";
import FormInput from "@/src/globalElements/FormBuilder/components/FormInput/FormInput";

export default function UpdateContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { success, error } = useMessageStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const getCategoryWrapper = async () => {
    const result = await getYoutubeById({
      locale: locale as CustomLocales,
      id: id as string,
    });

    return {
      data: result.data as YoutubeItems | undefined,
      message: result.message,
      code: result.code,
    };
  };
  const { data: existingData } = useServerQueryById<YoutubeItems>(
    youtube_main_list,
    getCategoryWrapper,
    id,
    { locale }
  );
  const formValues = useMemo(
    () => ({
      url: existingData?.url || "",
      title: existingData?.translations?.[0]?.title || "",
      description: existingData?.translations?.[0]?.description || "",
      locale: locale as CustomLocales,
    }),
    [existingData, locale]
  );
  const generalForm = useForm<UpdateYoutubeInput>({
    resolver: zodResolver(uptadeYoutubeSchema),
    values: formValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = generalForm;

  const onSubmit = async (data: UpdateYoutubeInput) => {
    startTransition(async () => {
      const result = await updateYoutube(id as string, data);

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
                label="Youtube linki"
                placeholder="Youtube linki"
                type="url"
                fieldName="url"
              />
              <FormTextArea
                label="Qısa məlumat"
                placeholder="Qısa məlumat"
                fieldName="description"
              />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-4"}>
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
