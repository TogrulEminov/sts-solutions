"use client";
import {
  CreateCallActionInput,
  createCallActionSchema,
} from "@/src/schema/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormPhone from "@/src/ui/FormBuilder/components/FormPhone";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";
import { ServicesCategoryItem } from "@/src/services/interface";
import { useDropdownOptions } from "@/src/hooks/useDropdownOptions";
import { useTranslations } from "next-intl";
import { createContactUs } from "@/src/actions/ui/form.actions";

interface Props {
  servicesData: ServicesCategoryItem[];
}

export default function FormContactWrapper({ servicesData }: Props) {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<CreateCallActionInput>({
    mode: "onChange",
    resolver: zodResolver(createCallActionSchema),
    defaultValues: {
      title: "",
      email: "",
      phone: "",
      services: "",
      message: "",
    },
  });

  const handleSubmit = async (data: CreateCallActionInput) => {
    startTransition(async () => {
      try {
        await createContactUs(data);
        methods.reset();
        setIsSuccess(true);
      } catch (error) {
        console.error("Submit error:", error);
      }
    });
  };

  const enumOptions = useDropdownOptions(
    servicesData?.flatMap((item) =>
      item.translations.map((tr) => ({
        ...tr,
        value: tr.title,
        label: tr.title,
      }))
    ) || [],
    "value",
    "label"
  );

  return (
    <div className="bg-ui-23 lg:col-span-6 rounded-md lg:rounded-2xl p-2 lg:p-8 border border-ui-24 shadow-sm">
      {isSuccess ? (
        <div className="flex flex-col h-full space-y-5 items-center justify-center py-12 lg:py-20 px-4">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-bounce">
            <svg
              className="w-12 h-12 lg:w-14 lg:h-14 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold font-inter text-ui-1 mb-3 text-center">
            {t("contactForm.successTitle")}
          </h3>

          <p className="text-sm lg:text-base text-ui-7 text-center max-w-md">
            {t("contactForm.successMessage")}
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            type="button"
            className="w-60 mx-auto cursor-pointer transition-all duration-300 hover:bg-red-500 hover:shadow-lg h-12 flex items-center justify-center bg-red-400 text-white font-inter font-medium uppercase rounded-xl"
          >
            {t("contactForm.close")}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-col space-y-4 items-center text-center">
            <h2 className="text-2xl lg:text-3xl font-extrabold font-inter text-ui-1 mb-2">
              {t("contactForm.comment")}
            </h2>
            <p className="text-sm text-ui-7 max-w-md">
              {t("contactForm.commentDesc")}
            </p>
          </div>

          <FormWrapper
            className="flex flex-col lg:grid gap-2 lg:gap-4 lg:grid-cols-2"
            form={methods}
            onSubmit={methods.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col space-y-2">
              <label className="font-inter font-medium text-sm text-ui-9">
                {t("contactForm.name")} <sup className="text-ui-1">*</sup>
              </label>
              <FormInput
                type={"text"}
                fieldName="title"
                styles={{
                  input: {
                    background: "#FAFAFA",
                    border: "1px solid #E0E0E0",
                    height: "44px",
                    padding: "0.75rem",
                    color: "#212121",
                    borderRadius: "0.5rem",
                    fontFamily: "'manrope', sans-serif",
                    fontSize: "0.875rem",
                  },
                }}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-inter font-medium text-sm text-ui-9">
                {t("contactForm.email")} <sup className="text-ui-1">*</sup>
              </label>
              <FormInput
                type={"email"}
                styles={{
                  input: {
                    background: "#FAFAFA",
                    border: "1px solid #E0E0E0",
                    height: "44px",
                    color: "#212121",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    fontFamily: "'manrope', sans-serif",
                    fontSize: "0.875rem",
                  },
                }}
                fieldName="email"
              />
            </div>

            <div className="flex flex-col lg:col-span-2 space-y-2">
              <label className="font-inter font-medium text-sm text-ui-9">
                {t("contactForm.phone")}
                <sup className="text-ui-1">*</sup>
              </label>
              <FormPhone
                fieldName="phone"
                styles={{
                  input: {
                    background: "#FAFAFA",
                    border: "1px solid #E0E0E0",
                    height: "44px",
                    color: "#212121",
                    width: "100%",
                    outline: "none",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    fontFamily: "'manrope', sans-serif",
                    fontSize: "0.875rem",
                  },
                }}
              />
            </div>

            <div className="flex flex-col space-y-2 col-span-2">
              <label className="font-inter font-medium text-sm text-ui-9">
                {t("contactForm.selectService")}
                <sup className="text-ui-1">*</sup>
              </label>
              <FormSelect
                fieldName="services"
                options={enumOptions}
                styles={{
                  root: {
                    background: "#FAFAFA",
                    border: "1px solid #E0E0E0",
                    height: "44px",
                    color: "#212121",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    fontFamily: "'manrope', sans-serif",
                    fontSize: "0.875rem",
                  },
                  suffix: {
                    color: "#757575",
                  },
                }}
              />
            </div>

            <div className="flex flex-col space-y-2 lg:col-span-2">
              <label className="font-inter font-medium text-sm text-ui-9">
                {t("contactForm.note")}
              </label>
              <FormTextArea
                fieldName="message"
                rows={5}
                styles={{
                  textarea: {
                    background: "#FAFAFA",
                    border: "1px solid #E0E0E0",
                    minHeight: "100px",
                    padding: "0.75rem",
                    color: "#212121",
                    borderRadius: "0.5rem",
                    fontFamily: "'manrope', sans-serif",
                    fontSize: "0.875rem",
                    resize: "none",
                  },
                }}
              />
            </div>

            <div className="lg:col-span-2 flex">
              <button
                type="submit"
                disabled={isPending}
                className="bg-ui-1 w-full px-12 cursor-pointer transition-all duration-300 hover:bg-ui-4 disabled:bg-gray-400 disabled:cursor-not-allowed h-10 lg:h-12 rounded-lg text-white font-inter font-semibold text-base shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <span>{t("contactForm.sending")}...</span>
                ) : (
                  <span>{t("contactForm.send")}</span>
                )}
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </FormWrapper>
        </>
      )}
    </div>
  );
}
