import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import { useId, useEffect, useRef, useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { useFormWrapper } from "../../hooks/useFormWrapper";
import type { IFormComponentProps } from "../../type/types";
import IMask, { type InputMask } from "imask";

interface BaseFormPhoneProps {
  inputClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  styles?: {
    input?: React.CSSProperties;
  };
}

export type FormPhoneProps = BaseFormPhoneProps & IFormComponentProps;

// Bütün ölkələr üçün mask formatları
const PHONE_MASKS = [
  { mask: "+994 (00) 000-00-00" }, // Azərbaycan
  { mask: "+90 (000) 000-00-00" }, // Türkiyə
  { mask: "+1 (000) 000-0000" }, // ABŞ/Kanada
  { mask: "+44 00 0000 0000" }, // Böyük Britaniya
  { mask: "+49 000 00000000" }, // Almaniya
  { mask: "+33 0 00 00 00 00" }, // Fransa
  { mask: "+7 (000) 000-00-00" }, // Rusiya/Qazaxıstan
  { mask: "+380 (00) 000-00-00" }, // Ukrayna
  { mask: "+995 (000) 00-00-00" }, // Gürcüstan
  { mask: "+998 (00) 000-00-00" }, // Özbəkistan
  { mask: "+86 000 0000 0000" }, // Çin
  { mask: "+81 00-0000-0000" }, // Yaponiya
  { mask: "+91 00000-00000" }, // Hindistan
  { mask: "+55 (00) 00000-0000" }, // Braziliya
  { mask: "+39 000 000 0000" }, // İtaliya
  { mask: "+34 000 00 00 00" }, // İspaniya
  { mask: "+61 0 0000 0000" }, // Avstraliya
  { mask: "+966 0 000 0000" }, // Səudiyyə Ərəbistanı
  { mask: "+971 00 000 0000" }, // BƏƏ
];

// Internal component to handle IMask logic
function PhoneInput({
  value,
  onChange,
  id,
  fieldName,
  placeholder,
  inputClassName,
  styles,
  disabled,
  readOnly,
}: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<InputMask<any> | null>(null);
  const isInternalUpdate = useRef(false);
  const [isFocused, setIsFocused] = useState(false);

  // onChange-i memoize edirik
  const handleMaskChange = useCallback(
    (maskedValue: string) => {
      if (!isInternalUpdate.current) {
        onChange(maskedValue);
      }
    },
    [onChange]
  );

  // Mask-ı yalnız bir dəfə yaradırıq (mount zamanı)
  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement || maskRef.current) return;

    maskRef.current = IMask(inputElement, {
      mask: PHONE_MASKS,
      dispatch: (appended: string, dynamicMasked: any) => {
        const current = (dynamicMasked.value + appended).replace(/\D/g, "");

        // Ölkə koduna görə düzgün mask seçimi
        if (current.startsWith("994")) return dynamicMasked.compiledMasks[0]; // AZ
        if (current.startsWith("90")) return dynamicMasked.compiledMasks[1]; // TR
        if (current.startsWith("1")) return dynamicMasked.compiledMasks[2]; // US/CA
        if (current.startsWith("44")) return dynamicMasked.compiledMasks[3]; // GB
        if (current.startsWith("49")) return dynamicMasked.compiledMasks[4]; // DE
        if (current.startsWith("33")) return dynamicMasked.compiledMasks[5]; // FR
        if (current.startsWith("7")) return dynamicMasked.compiledMasks[6]; // RU/KZ
        if (current.startsWith("380")) return dynamicMasked.compiledMasks[7]; // UA
        if (current.startsWith("995")) return dynamicMasked.compiledMasks[8]; // GE
        if (current.startsWith("998")) return dynamicMasked.compiledMasks[9]; // UZ
        if (current.startsWith("86")) return dynamicMasked.compiledMasks[10]; // CN
        if (current.startsWith("81")) return dynamicMasked.compiledMasks[11]; // JP
        if (current.startsWith("91")) return dynamicMasked.compiledMasks[12]; // IN
        if (current.startsWith("55")) return dynamicMasked.compiledMasks[13]; // BR
        if (current.startsWith("39")) return dynamicMasked.compiledMasks[14]; // IT
        if (current.startsWith("34")) return dynamicMasked.compiledMasks[15]; // ES
        if (current.startsWith("61")) return dynamicMasked.compiledMasks[16]; // AU
        if (current.startsWith("966")) return dynamicMasked.compiledMasks[17]; // SA
        if (current.startsWith("971")) return dynamicMasked.compiledMasks[18]; // AE

        return dynamicMasked.compiledMasks[0]; // Default: AZ
      },
    });

    // Event handler
    const handleAccept = () => {
      if (maskRef.current) {
        handleMaskChange(maskRef.current.value);
      }
    };

    maskRef.current.on("accept", handleAccept);

    // Cleanup - yalnız unmount zamanı
    return () => {
      if (maskRef.current) {
        maskRef.current.destroy();
        maskRef.current = null;
      }
    };
  }, [handleMaskChange]);

  // Value dəyişəndə mask-ı update edirik (ayrı useEffect)
  useEffect(() => {
    if (maskRef.current) {
      const currentValue = value || "";
      const maskValue = maskRef.current.value;

      // Yalnız fərqli olduqda update edirik
      if (maskValue !== currentValue) {
        isInternalUpdate.current = true;
        maskRef.current.value = currentValue;

        // Növbəti tick-də flag-ı sıfırlayırıq
        setTimeout(() => {
          isInternalUpdate.current = false;
        }, 0);
      }
    }
  }, [value]);

  const baseStyles: React.CSSProperties = {
    background: "#FAFAFA",
    border: isFocused ? "2px solid #1BAFBF" : "1px solid #E0E0E0",
    height: "44px",
    color: "#212121",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    fontFamily: "'manrope', sans-serif",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    boxShadow: isFocused ? "0 0 0 3px rgba(27, 175, 191, 0.1)" : "none",
    ...styles?.input,
  };

  return (
    <input
      ref={inputRef}
      id={id}
      name={fieldName}
      type="tel"
      placeholder={placeholder || "+994 (00) 000-00-00"}
      autoComplete="off"
      disabled={disabled}
      readOnly={readOnly}
      className={inputClassName}
      style={baseStyles}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

function FormPhone({
  label,
  fieldName,
  className,
  inputClassName,
  dependOn,
  isVisible,
  calculateValue,
  styles,
  placeholder,
  disabled,
  readOnly,
  ...inputProps
}: FormPhoneProps) {
  const { control } = useFormWrapper();
  const id = useId();

  return (
    <ComponentWrapper
      dependOn={dependOn}
      calculateValue={calculateValue}
      isVisible={isVisible}
      className={className}
      label={label}
      fieldName={fieldName}
      id={id}
    >
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            value={value}
            onChange={onChange}
            id={id}
            fieldName={fieldName}
            placeholder={placeholder}
            inputClassName={inputClassName}
            styles={styles}
            disabled={disabled}
            readOnly={readOnly}
            {...inputProps}
          />
        )}
      />
    </ComponentWrapper>
  );
}

export default FormPhone;