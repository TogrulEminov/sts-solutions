import { InputNumber, type InputNumberProps } from "antd"
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper"
import { useId } from "react"
import { Controller } from "react-hook-form"
import { useFormWrapper } from "../../hooks/useFormWrapper"
import type { IFormComponentProps } from "../../type/types"

interface BaseFormInputProps extends InputNumberProps {
	className?: string
	decimalPlace: number
}

export type FormInputProps = BaseFormInputProps &
	IFormComponentProps

function FormInputFloat({
	label,
	fieldName,
	className,
	dependOn,
	isVisible,
	calculateValue,
	decimalPlace,
	...inputProps
}: FormInputProps) {
	const { control } = useFormWrapper()
	const id = useId()
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
				render={({
					field: { onChange, ...rest },
				}) => (
					<InputNumber
						placeholder={label}
						style={{ width: "100%" }}
						id={id}
						{...rest}
						onChange={(e) => {
							if (e)
								onChange(
									parseFloat(
										Number(e).toFixed(
											decimalPlace,
										),
									),
								)
							else onChange(null)
						}}
						{...inputProps}
					/>
				)}
			/>
		</ComponentWrapper>
	)
}

export default FormInputFloat
