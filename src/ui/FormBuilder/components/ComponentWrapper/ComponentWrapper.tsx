"use client";
import s from "./style.module.css";
import { ErrorMessage } from "@hookform/error-message";
import { useFormWrapper } from "../../hooks/useFormWrapper";
import type { ComponentWrapperDependOnProps } from "../../type/types.ts";
import { useWatch } from "react-hook-form";
import { useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface BaseComponentWrapperProps {
  label?: string;
  fieldName: string;
  children: React.ReactNode;
  id: string;
  className?: string;
  labelClassName?: string;
}

type ComponentWrapperProps = BaseComponentWrapperProps &
  ComponentWrapperDependOnProps;

function ComponentWrapper({
  children,
  label,
  fieldName,
  id,
  dependOn,
  isVisible,
  calculateValue,
  className,
  labelClassName,
}: ComponentWrapperProps) {
  const {
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useFormWrapper(label);
  const depValues = useWatch({
    control,
    name: dependOn ?? [],
  });

  // Experimental code: reset value when dependencies change
  const firstDependValues = useRef<string>("");
  useEffect(() => {
    if (depValues) {
      const curr = depValues.toString();
      if (
        curr !== firstDependValues.current &&
        firstDependValues.current !== ""
      ) {
        setValue(fieldName, null);
      }
      firstDependValues.current = curr;
    }
  }, [depValues, fieldName, setValue]);

  const canRender = useMemo(() => {
    if (!dependOn?.length || !isVisible) return true;
    return isVisible(depValues);
  }, [isVisible, dependOn, depValues]);

  useEffect(() => {
    if (!calculateValue || !dependOn?.length) return;
    const next = calculateValue(depValues);
    const prev = getValues(fieldName);

    if (prev !== next) {
      setValue(fieldName, next, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [calculateValue, fieldName, setValue, getValues, depValues, dependOn]);

  if (!canRender) return null;

  return (
    <div className={`${s.container} ${className} relative`}>
      <label
        htmlFor={id}
        className={`
          ${s.label} ${labelClassName}
          block text-base mb-1 font-medium
          text-gray-700 w-full  
        `}
      >
        {label}
      </label>
      {children}
      <FormError errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default ComponentWrapper;

export function FormError({
  fieldName,
  errors,
}: {
  fieldName: string;
  errors?: Error[] | undefined | any;
}) {
  return (
    <ErrorMessage
      name={fieldName}
      errors={errors}
      render={({ message }) => (
        <AnimatePresence mode="wait">
          <motion.div
            key={fieldName}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="alert"
            aria-live="polite"
            className="absolute left-0 right-0 top-full mt-1 z-10"
            style={{ pointerEvents: "none" }}
          >
            {/* Arrow pointer */}
            <div className="absolute -top-1 left-4 w-2 h-2 bg-red-600 rotate-45 z-10" />

            {/* Error box */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              className="relative flex items-center gap-2 px-3 py-2  w-fit rounded-lg bg-red-600 shadow-lg"
            >
              {/* Icon with bounce */}
              <motion.div
                initial={{ rotate: -45, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                  delay: 0.1,
                }}
              >
                <AlertTriangle className="w-4 h-4 text-white shrink-0" />
              </motion.div>

              {/* Message */}
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                className="text-xs font-medium text-white whitespace-pre-line"
              >
                {message}
              </motion.span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    />
  );
}