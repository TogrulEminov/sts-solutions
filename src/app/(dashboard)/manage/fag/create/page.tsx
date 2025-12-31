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
import { CreateFagInput, createFagSchema } from "@/src/schema/fag.schema";
import { createFag } from "@/src/actions/client/fag.actions";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";

export default function CreateFag() {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") ?? "az";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { success, error } = useMessageStore();
  const fagForm = useForm<CreateFagInput>({
    resolver: zodResolver(createFagSchema),
    defaultValues: {
      title: "",
      description: "",
      locale: locale as CustomLocales,
    },
  });

  const onSubmit = async (data: CreateFagInput) => {
    startTransition(async () => {
      const result = await createFag(data);

      if (result.success) {
        success("Məlumat uğurla yadda saxlandı!");
        fagForm.reset();
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
          form={fagForm}
          onSubmit={fagForm.handleSubmit(onSubmit)}
          className={"grid grid-cols-1 gap-5"}
        >
          <div className={"flex flex-col space-y-5"}>
            <FieldBlock>
              <FormInput
                label="Başlıq"
                placeholder="Başlıq"
                required={true}
                fieldName="title"
              />
              <FormTextArea
                label="Qısa məlumat"
                placeholder="Qısa məlumat"
                fieldName="description"
              />
            </FieldBlock>
          </div>
          <div className={"flex flex-col space-y-5"}>
            <div className={"grid grid-cols-2 gap-5"}>
              <NavigateBtn />
              <CreateButton
                isLoading={isPending}
                disabled={!fagForm.formState.isDirty || isPending}
              />
            </div>
          </div>
        </FormWrapper>
      </section>
    </>
  );
}
