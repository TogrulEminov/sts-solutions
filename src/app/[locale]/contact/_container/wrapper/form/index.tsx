"use client";
import {
  CreateCallActionInput,
  createCallActionSchema,
} from "@/src/schema/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormPhone from "@/src/ui/FormBuilder/components/FormPhone";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";

export default function FormContactWrapper() {
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

  const [progress, setProgress] = useState(0);
  const watchedFields = methods.watch();

  useEffect(() => {
    const fields = Object.values(watchedFields);
    const filledFields = fields.filter(
      (field) => field && field.toString().trim() !== ""
    ).length;
    const totalFields = fields.length;
    setProgress((filledFields / totalFields) * 100);
  }, [watchedFields]);

  const handleSubmit = (data: CreateCallActionInput) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="bg-ui-23 col-span-6 rounded-2xl p-8 border border-ui-24 shadow-sm">
      {/* Header with Progress */}
      <div className="mb-8 flex flex-col space-y-4 items-center text-center">
        <h2 className="text-2xl lg:text-3xl font-extrabold font-inter text-ui-1 mb-2">
          Rəy və təklifləriniz
        </h2>
        <p className="text-sm text-ui-7 max-w-md">
          Bizimlə əlaqə saxlamaq üçün formanı doldurun və biz sizinlə tezliklə
          əlaqə saxlayacağıq.
        </p>
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between text-xs text-ui-1 mb-2">
            <span>Tamamlanma</span>
            <span className="font-semibold text-ui-1">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-ui-24 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-ui-1 to-6 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <FormWrapper
        className="grid gap-4 grid-cols-1 lg:grid-cols-2"
        form={methods}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {/* Rest of the form fields remain the same */}
        <div className="flex flex-col space-y-2">
          <label className="font-inter font-medium text-sm text-ui-9">
            Ad <sup className="text-ui-1">*</sup>
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
            Soyad <sup className="text-ui-1">*</sup>
          </label>
          <FormInput
            type={"text"}
            fieldName="surname"
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
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-inter font-medium text-sm text-ui-9">
            Email <sup className="text-ui-1">*</sup>
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

        <div className="flex flex-col space-y-2">
          <label className="font-inter font-medium text-sm text-ui-9">
            Mobil nömrə <sup className="text-ui-1">*</sup>
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

        <div className="flex flex-col space-y-2">
          <label className="font-inter font-medium text-sm text-ui-9">
            Şirkət adı
          </label>
          <FormInput
            type={"text"}
            fieldName="company"
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
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-inter font-medium text-sm text-ui-9">
            Xidmət seçin <sup className="text-ui-1">*</sup>
          </label>
          <FormSelect
            fieldName="services"
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
            Mesajınız
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
            className="bg-ui-1 w-full px-12 cursor-pointer transition-all duration-300 hover:bg-ui-4 h-12 rounded-lg text-white font-inter font-semibold text-base shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            Göndər
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
    </div>
  );
}
