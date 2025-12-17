import s from "./style.module.css";
import { ErrorMessage } from "@hookform/error-message";
import { useFormWrapper } from "../../hooks/useFormWrapper";
import type { ComponentWrapperDependOnProps } from "../../type/types.ts";
import { useWatch } from "react-hook-form";
import { useEffect, useMemo, useRef } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
    <div className={`${s.container} ${className}`}>
      <label
        htmlFor={id}
        className={`
      ${s.label}  ${labelClassName}
      block text-sm font-medium
      text-gray-700  w-full  
    `}
      >
        {label}
      </label>
      {children}
      <FormError errors={errors} fieldName={fieldName}></FormError>
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
        <span
          role="alert"
          aria-live="polite"
          className="
        mt-1 inline-flex items-center gap-2
        text-[12px] leading-5 font-medium
        text-white
        bg-red-500/10
        backdrop-blur-[2px]
        rounded-lg px-2.5 py-0.5
       ring-red-500/20
        shadow-sm
      "
        >
          <ExclamationCircleOutlined className="text-[14px]" />
          <span className="whitespace-pre-line">{message}</span>
        </span>
      )}
    />
  );
}
