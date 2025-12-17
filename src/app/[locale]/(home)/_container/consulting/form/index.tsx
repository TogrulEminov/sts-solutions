"use client";
import {
  CreateCallActionInput,
  createCallActionSchema,
} from "@/src/schema/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormPhone from "@/src/ui/FormBuilder/components/FormPhone";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";
import FormTextArea from "@/src/ui/FormBuilder/components/FormTextArea/FormTextArea";

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

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const progressBarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
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
  const watchedFields = methods.watch();

  useEffect(() => {
    const fields = Object.values(watchedFields);
    const filledFields = fields.filter(
      (field) => field && field.toString().trim() !== ""
    ).length;
    const totalFields = fields.length;
    setProgress((filledFields / totalFields) * 100);
  }, [watchedFields]);

  const handleSubmit = async (data: CreateCallActionInput) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="bg-white col-span-6 rounded-2xl p-10 border border-gray-50 shadow-sm flex flex-col space-y-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col space-y-5 items-center text-center"
        variants={headerVariants}
      >
        <motion.strong
          className="text-2xl font-extrabold font-manrope text-ui-1"
          variants={textVariants}
        >
          Rəy və təklifləriniz
        </motion.strong>
        
        <motion.p
          className="text-sm text-ui-11"
          variants={textVariants}
        >
          Bizimlə əlaqə saxlamaq üçün formanı doldurun və biz sizinlə tezliklə
          əlaqə saxlayacağıq.
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="w-full flex flex-col space-y-1"
          variants={progressBarVariants}
        >
          <div className="flex items-center justify-between text-xs text-ui-2">
            <span>Tamamlanma</span>
            <motion.span
              className="font-semibold text-ui-1"
              key={progress}
              initial={{ scale: 1.2, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-ui-1 to-ui-1/80 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear" as const,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Form Wrapper */}
      <FormWrapper
        className="grid gap-2 grid-cols-1 lg:grid-cols-2"
        form={methods}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {/* Ad Field */}
        <motion.div
          className="flex flex-col space-y-1"
          variants={fieldVariants}
        >
          <label className="font-manrope font-medium text-sm text-ui-12">
            Ad <sup className="text-red-500">*</sup>
          </label>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
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
          </motion.div>
        </motion.div>

        {/* Email Field */}
        <motion.div
          className="flex flex-col space-y-1"
          variants={fieldVariants}
        >
          <label className="font-manrope font-medium text-sm text-ui-12">
            Email <sup className="text-red-500">*</sup>
          </label>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
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
          </motion.div>
        </motion.div>

        {/* Phone Field */}
        <motion.div
          className="flex flex-col space-y-1 col-span-2"
          variants={fieldVariants}
        >
          <label className="font-manrope font-medium text-sm text-ui-12">
            Mobil nömrə <sup className="text-red-500">*</sup>
          </label>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
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
          </motion.div>
        </motion.div>

        {/* Services Field */}
        <motion.div
          className="flex flex-col space-y-1 lg:col-span-2"
          variants={fieldVariants}
        >
          <label className="font-manrope font-medium text-sm text-ui-12">
            Xidmət seçin <sup className="text-red-500">*</sup>
          </label>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
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
        </motion.div>

        {/* Message Field */}
        <motion.div
          className="flex flex-col space-y-1 lg:col-span-2"
          variants={fieldVariants}
        >
          <label className="font-manrope font-medium text-sm text-ui-12">
            Mesajınız
          </label>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
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
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="lg:col-span-2 flex"
          variants={fieldVariants}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="relative bg-ui-1 w-full px-12 cursor-pointer h-10 rounded-lg text-white font-manrope font-semibold text-base shadow-lg overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background gradient animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-ui-1 via-ui-1/90 to-ui-1"
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