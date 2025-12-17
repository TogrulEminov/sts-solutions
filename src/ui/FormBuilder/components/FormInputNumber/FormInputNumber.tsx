import { InputNumber, type InputNumberProps } from "antd"
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper"
import { useId } from "react"
import { Controller } from "react-hook-form"
import { useFormWrapper } from "../../hooks/useFormWrapper"
import type { IFormComponentProps } from "../../type/types"

interface BaseFormInputProps extends InputNumberProps {
	className?: string
}

export type FormInputProps = BaseFormInputProps &
	IFormComponentProps

function FormInputNumber({
	label,
	fieldName,
	className,
	dependOn,
	isVisible,
	calculateValue,
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
				render={({ field }) => (
					<InputNumber
						placeholder={label}
						style={{ width: "100%" }}
						id={id}
						{...field}
						{...inputProps}
					/>
				)}
			/>
		</ComponentWrapper>
	)
}

export default FormInputNumber
