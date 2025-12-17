import { Input, type InputProps, type InputRef } from "antd";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import { useId, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import { useFormWrapper } from "../../hooks/useFormWrapper";
import type { IFormComponentProps } from "../../type/types";
import IMask, { type InputMask } from "imask";

interface BaseFormPhoneProps extends Omit<InputProps, "onChange" | "value"> {
  inputClassName?: string;
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
  inputRef,
  id,
  fieldName,
  label,
  inputClassName,
  styles,
  ...inputProps
}: any) {
  const maskRef = useRef<InputMask<any> | null>(null);

  useEffect(() => {
    if (!inputRef.current?.input) return;

    // Mask-ı yalnız bir dəfə yaradırıq
    if (!maskRef.current) {
      maskRef.current = IMask(inputRef.current.input, {
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

      // Event handler-i əlavə edirik
      maskRef.current.on("accept", () => {
        if (maskRef.current) {
          onChange(maskRef.current.value);
        }
      });
    }

    // Value dəyişəndə mask-ı yeniləyirik
    if (maskRef.current && maskRef.current.value !== value) {
      maskRef.current.value = value || "";
    }

    // Cleanup
    return () => {
      if (maskRef.current) {
        maskRef.current.destroy();
        maskRef.current = null;
      }
    };
  }, [value, onChange, inputRef]);

  return (
    <Input
      {...inputProps}
      ref={inputRef}
      id={id}
      name={fieldName}
      type="tel"
      placeholder={label || "+994 (00) 000-00-00"}
      autoComplete="off"
      classNames={{
        input: inputClassName,
      }}
      styles={styles}
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
  ...inputProps
}: FormPhoneProps) {
  const { control } = useFormWrapper();
  const id = useId();
  const inputRef = useRef<InputRef>(null);

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
            inputRef={inputRef}
            id={id}
            fieldName={fieldName}
            label={label}
            inputClassName={inputClassName}
            styles={styles}
            {...inputProps}
          />
        )}
      />
    </ComponentWrapper>
  );
}

export default FormPhone;
