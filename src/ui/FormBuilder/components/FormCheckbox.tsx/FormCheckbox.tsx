import { Checkbox, type CheckboxProps } from "antd"
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper"
import { useId } from "react"
import { Controller } from "react-hook-form"
import { useFormWrapper } from "../../hooks/useFormWrapper"
import type { IFormComponentProps } from "../../type/types"

interface BaseFormInputProps extends CheckboxProps {
	className?: string
}

export type FormInputProps = BaseFormInputProps &
	IFormComponentProps

function FormCheckbox({
	label,
	fieldName,
	className,
	dependOn,
	isVisible,
	calculateValue,

	...props
}: FormInputProps) {
	const { control } = useFormWrapper()
	const id = useId()

	return (
		<ComponentWrapper
			labelClassName={"text-start"}
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
					<Checkbox
						checked={field.value}
						onChange={field.onChange}
						{...props}
					/>
				)}
			/>
		</ComponentWrapper>
	)
}

export default FormCheckbox
