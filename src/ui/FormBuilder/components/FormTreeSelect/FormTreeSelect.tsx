import { useId } from "react"
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper"
import {
	Skeleton,
	TreeSelect,
	type TreeSelectProps,
} from "antd"
import type { IFormComponentProps } from "../../type/types.ts"
import { Controller } from "react-hook-form"
import { useFormWrapper } from "../../hooks/useFormWrapper"

interface BaseFormSelectProps extends TreeSelectProps {
	treeName?: string
}

export type FormSelectProps = BaseFormSelectProps &
	IFormComponentProps

function FormTreeSelect({
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
					field: { onChange, ...field },
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
						<TreeSelect
							placeholder={label}
							treeLine={true}
							showSearch
							style={{ width: "100%" }}
							allowClear={true}
							{...field}
							onChange={(v) =>
								onChange(v ?? null)
							}
							{...props}
							id={id}
						></TreeSelect>
					)
				}}
				name={fieldName}
				control={control}
			></Controller>
		</ComponentWrapper>
	)
}

export default FormTreeSelect
