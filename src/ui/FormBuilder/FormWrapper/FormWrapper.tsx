import { type FieldValue, type UseFormReturn } from "react-hook-form";
import { FormProvider } from "./FormProvider";
import { type ReactNode } from "react";

interface FormWrapperProps<T> {
  children: ReactNode;
  form: UseFormReturn<FieldValue<any>>;
  onSubmit?: (values: T) => unknown;
  searchParamsKey?: string;
  className?: string;
  disableFormSubmit?: boolean;
}

function FormWrapper<T>({
  children,
  form,
  onSubmit,
  className,
  searchParamsKey,
  disableFormSubmit = false,
}: FormWrapperProps<T>) {
  function handleSubmit(values: T) {
    onSubmit?.(values);
  }

  return (
    <FormProvider value={{ form, searchParamsKey }}>
      <form
        className={`${className} relative`}
        onSubmit={
          disableFormSubmit ? undefined : form.handleSubmit(handleSubmit)
        }
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default FormWrapper;
