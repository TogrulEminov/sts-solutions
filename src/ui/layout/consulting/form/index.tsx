"use client";
import {
  CreateCallActionInput,
  createCallActionSchema,
} from "@/src/schema/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormPhone from "@/src/ui/FormBuilder/components/FormPhone";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";
import { CheckCircle2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line react-hooks/incompatible-library
  const title = methods.watch("title");
  const email = methods.watch("email");
  const phone = methods.watch("phone");
  const services = methods.watch("services");
  const message = methods.watch("message");

  // useMemo ilə hesablama
  const { filledCount, totalFields, progressPercentage } = useMemo(() => {
    const fields = [title, email, phone, services, message];
    const filled = fields.filter(
      (field) => field && field.toString().trim() !== ""
    ).length;
    const total = fields.length;
    const percentage = (filled / total) * 100;

    return {
      filledCount: filled,
      totalFields: total,
      progressPercentage: percentage,
    };
  }, [title, email, phone, services, message]);

  // Progress update - yalnız dəyər dəyişəndə
  useEffect(() => {
    setProgress(progressPercentage);
  }, [progressPercentage]);

  const handleSubmit = async (data: CreateCallActionInput) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    // Form-u reset et (istəyirsənsə)
    methods.reset();
  };

  return (
    <motion.div
      className="bg-white lg:col-span-6 rounded-md lg:rounded-2xl p-3 lg:p-10 border border-gray-50 shadow-sm flex flex-col space-y-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Header section */}
      <motion.div className="flex flex-col space-y-6" variants={headerVariants}>
        {/* Title */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col space-y-1">
            <h3 className="font-inter font-bold text-lg sm:text-2xl text-ui-2">
              Əlaqə forması
            </h3>
            <p className="font-inter text-sm text-gray-500">
              Formu doldurun, sizinlə əlaqə saxlayaq
            </p>
          </div>

          {/* Compact Progress Badge */}
          <motion.div
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-ui-1/10 to-ui-1/5 border border-ui-1/20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full border-4 border-gray-200 flex items-center justify-center relative"
              style={{
                background: `conic-gradient(#1BAFBF ${progress}%, #E0E0E0 ${progress}%)`,
              }}
            >
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                {progress === 100 ? (
                  <CheckCircle2 className="w-5 h-5 text-ui-1" />
                ) : (
                  <span className="font-inter font-bold text-xs text-ui-1">
                    {Math.round(progress)}%
                  </span>
                )}
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-inter text-xs text-gray-500">
                Tamamlanma
              </span>
              <span className="font-inter font-semibold text-sm text-ui-2">
                {filledCount}/{totalFields} sahə
              </span>
            </div>
          </motion.div>
        </div>

        {/* Linear Progress Bar */}
        <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-linear-to-r from-ui-1 to-ui-1/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Form Wrapper */}
      <FormWrapper
        className="flex flex-col lg:grid gap-2 lg:grid-cols-2"
        form={methods}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {/* Ad Field */}
        <motion.div
          className="flex flex-col space-y-1"
          variants={fieldVariants}
        >
          <label className="font-inter font-medium text-sm text-ui-12">
            Ad <sup className="text-red-500">*</sup>
          </label>
          <FormInput
            type="text"
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
        </motion.div>

        {/* Email Field */}
        <motion.div
          className="flex flex-col space-y-1"
          variants={fieldVariants}
        >
          <label className="font-inter font-medium text-sm text-ui-12">
            Email <sup className="text-red-500">*</sup>
          </label>
          <FormInput
            type="email"
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
        </motion.div>

        {/* Phone Field */}
        <motion.div
          className="flex flex-col space-y-1 col-span-2"
          variants={fieldVariants}
        >
          <label className="font-inter font-medium text-sm text-ui-12">
            Mobil nömrə <sup className="text-red-500">*</sup>
          </label>
          <FormPhone
            fieldName="phone"
            placeholder="+994 XX XXX XX XX"
            styles={{
              input: {
                background: "#FAFAFA",
                border: "1px solid #E0E0E0",
                height: "44px",
                color: "#212121",
                padding: "0.75rem",

                width: "100%",
                borderRadius: "0.5rem",
                fontFamily: "'manrope', sans-serif",
                fontSize: "0.875rem",
              },
            }}
          />
        </motion.div>

        {/* Services Field */}
        <motion.div
          className="flex flex-col space-y-1 lg:col-span-2"
          variants={fieldVariants}
        >
          <label className="font-inter font-medium text-sm text-ui-12">
            Xidmət seçin <sup className="text-red-500">*</sup>
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
        </motion.div>

        {/* Message Field */}
        <motion.div
          className="flex flex-col space-y-1 lg:col-span-2"
          variants={fieldVariants}
        >
          <label className="font-inter font-medium text-sm text-ui-12">
            Mesajınız
          </label>
          <FormTextArea
            fieldName="message"
            rows={5}
            styles={{
              textarea: {
                background: "#FAFAFA",
                border: "1px solid #E0E0E0",
                height: "116px",
                padding: "0.75rem",
                color: "#212121",
                borderRadius: "0.5rem",
                fontFamily: "'manrope', sans-serif",
                fontSize: "0.875rem",
                resize: "none",
              },
            }}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div className="lg:col-span-2 flex" variants={fieldVariants}>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="relative bg-ui-1 w-full px-7 lg:px-12 cursor-pointer h-8 lg:h-10 rounded-md lg:rounded-lg text-white font-inter font-semibold text-sm lg:text-base shadow-lg overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background gradient animation */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-ui-1 via-ui-1/90 to-ui-1"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" as const }}
            />

            {/* Glow effect */}
            <span className="absolute inset-0 bg-ui-1/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <motion.svg
                    className="w-5 h-5"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear" as const,
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </motion.svg>
                  <span>Göndərilir...</span>
                </>
              ) : (
                <>
                  <span>Göndər</span>
                  <motion.svg
                    className="w-5 h-5"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
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
                  </motion.svg>
                </>
              )}
            </span>

            {/* Ripple effect on click */}
            <motion.span
              className="absolute inset-0 bg-white/20 rounded-lg"
              initial={{ scale: 0, opacity: 1 }}
              whileTap={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </FormWrapper>
    </motion.div>
  );
}
