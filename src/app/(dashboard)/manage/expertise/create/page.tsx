"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import NavigateBtn from "@/src/app/(dashboard)/manage/_components/navigateBtn";
import CreateButton from "@/src/app/(dashboard)/manage/_components/createButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomLocales } from "@/src/services/interface";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import { useForm } from "react-hook-form";
import {
  CreateExpertiseInput,
  createExpertiseSchema,
} from "@/src/schema/expertise.schema";
import { createExpertise } from "@/src/actions/client/expertise.actions";
import FormWrapper from "@/src/globalElements/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/globalElements/FormBuilder/components/FormInput/FormInput";
import FormSwitch from "@/src/globalElements/FormBuilder/components/FormSwitch/FormSwitch";

export default function CreateContent() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { success, error } = useMessageStore();
  const generalForm = useForm<CreateExpertiseInput>({
    resolver: zodResolver(createExpertiseSchema),
    defaultValues: {
      title: "",
      isActive: false,
      locale: locale as CustomLocales,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = generalForm;
  const onSubmit = async (data: CreateExpertiseInput) => {
    startTransition(async () => {
      const result = await createExpertise(data);

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
      <section className={"flex flex-col gap-4 mb-5"}>
        <h1 className="font-medium text-[#171717] text-3xl mb-8">
          {locale === "az"
            ? "Azərbaycan dilində daxil  et"
            : locale === "en"
            ? "İngilis dilində daxil et"
            : "Rus dilində daxil et"}
        </h1>
        <FormWrapper
          form={generalForm}
          onSubmit={handleSubmit(onSubmit)}
          className={"grid grid-cols-1 gap-5"}
        >
          <div className={"flex flex-col space-y-5"}>
            <FieldBlock>
              <FormInput
                label="Başlıq"
                placeholder="Başlıq"
                fieldName="title"
              />
              <FormSwitch
                label="Lahiyələrə aiddirmi?"
                fieldName="isActive"
                defaultValue={false}
              />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-5"}>
            <div className={"grid grid-cols-2 gap-5 max-w-lg"}>
              <NavigateBtn />
              <CreateButton
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
