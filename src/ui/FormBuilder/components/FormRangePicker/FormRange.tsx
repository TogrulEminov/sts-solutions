import { DatePicker } from "antd";
import type { IFormRangeComponentProps } from "../../type/types.ts";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import { useId } from "react";
import { useFormWrapper } from "../../hooks/useFormWrapper";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { default_time_format } from "../FormDatePicker/FormDatePicker.js";

interface BaseFormSelectProps extends RangePickerProps {
  dateName?: string;
}

type FormDatePickerProps = BaseFormSelectProps & IFormRangeComponentProps;

function FormRangePicker({
  className,
  dependOn,
  calculateValue,
  isVisible,
  label,
  fieldName,
  ...props
}: FormDatePickerProps) {
  const { watch, setValue } = useFormWrapper(label);
  const id = useId();

  const [startDate, endDate] = watch([fieldName[0], fieldName[1]]);

  return (
    <ComponentWrapper
      className={className}
      dependOn={dependOn}
      isVisible={isVisible}
      calculateValue={calculateValue}
      label={label}
      fieldName={fieldName[1]}
      id={id}
    >
      <DatePicker.RangePicker
        format={default_time_format}
        style={{ width: "100%" }}
        value={
          startDate && endDate
            ? [
                dayjs(startDate, default_time_format),
                dayjs(endDate, default_time_format),
              ]
            : undefined
        }
        {...props}
        id={id}
        onChange={(date) => {
          if (!date) {
            setValue(fieldName[0], undefined);
            setValue(fieldName[1], undefined);
            return;
          }

          setValue(
            fieldName[0],
            dayjs(date[0]).format(default_time_format).toString()
          );
          setValue(
            fieldName[1],
            dayjs(date[1]).format(default_time_format).toString()
          );

          // return field.onChange(date ?
          //     [dayjs(date[0]).format(default_time_format).toString(), dayjs(date[1]).format(default_time_format).toString()] : undefined
          // )
        }}
      ></DatePicker.RangePicker>
    </ComponentWrapper>
  );
}

export default FormRangePicker;
