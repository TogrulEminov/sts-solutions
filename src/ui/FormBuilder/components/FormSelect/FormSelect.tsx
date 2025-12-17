import { useId } from "react"
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper"
import { Select, type SelectProps, Skeleton } from "antd"
import type { IFormComponentProps } from "../../type/types.ts"
import { Controller } from "react-hook-form"
import { useFormWrapper } from "../../hooks/useFormWrapper"

interface BaseFormSelectProps extends SelectProps {}

export type FormSelectProps = BaseFormSelectProps &
	IFormComponentProps

function FormSelect({
	label,
	fieldName,
	dependOn,
	isVisible,
	calculateValue,
	className,
	...props
}: FormSelectProps) {
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
				render={({
					field: { onChange, ...otherField },
				}) => {
					if (props.loading)
						return (
							<Skeleton.Input
								active={true}
								size={"default"}
								block={true}
							/>
						)
					return (
						<Select
							placeholder={label}
							showSearch
							style={{ width: "100%" }}
							allowClear={true}
							{...otherField}
							onChange={(v) => {
								onChange(v ?? null)
							}}
							{...props}
							id={id}
							optionFilterProp="label"
						></Select>
					)
				}}
				name={fieldName}
				control={control}
			></Controller>
		</ComponentWrapper>
	)
}

export default FormSelect
