import { DatePicker } from "antd"
import type { IFormComponentProps } from "../../type/types.ts"
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper"
import { Controller } from "react-hook-form"
import { useId } from "react"
import { useFormWrapper } from "../../hooks/useFormWrapper"
import type { RangePickerProps } from "antd/es/date-picker"
import dayjs from "dayjs"
import { default_time_format } from "../FormDatePicker/FormDatePicker.js"
// import {default_time_format} from "../../../../core/const/time_format.ts";

interface BaseFormSelectProps extends RangePickerProps {
	rangeName?: string
}

type FormDatePickerProps = BaseFormSelectProps &
	IFormComponentProps

function FormRangePicker({
	className,
	dependOn,
	calculateValue,
	isVisible,
	label,
	fieldName,
	...props
}: FormDatePickerProps) {
	const { control } = useFormWrapper(label)
	const id = useId()
	return (
		<ComponentWrapper
			className={className}
			dependOn={dependOn}
			isVisible={isVisible}
			calculateValue={calculateValue}
			label={label}
			fieldName={fieldName}
			id={id}
		>
			<Controller
				render={({ field }) => {
					return (
						<DatePicker.RangePicker
							format={default_time_format}
							style={{ width: "100%" }}
							value={
								field.value
									? [
											dayjs(
												field
													.value[0],
												default_time_format,
											),
											dayjs(
												field
													.value[1],
												default_time_format,
											),
										]
									: undefined
							}
							{...props}
							id={id}
							onChange={(date) => {
								return field.onChange(
									date
										? [
												dayjs(
													date[0],
												)
													.format(
														default_time_format,
													)
													.toString(),
												dayjs(
													date[1],
												)
													.format(
														default_time_format,
													)
													.toString(),
											]
										: undefined,
								)
							}}
						></DatePicker.RangePicker>
					)
				}}
				name={fieldName}
				control={control}
			></Controller>
		</ComponentWrapper>
	)
}

export default FormRangePicker
