import { Input, type InputProps } from "antd"
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper"
import { useId, useState } from "react"
import { Controller } from "react-hook-form"
import { useFormWrapper } from "../../hooks/useFormWrapper"
import type { IFormComponentProps } from "../../type/types"
import {
	EyeInvisibleOutlined,
	EyeOutlined,
} from "@ant-design/icons"

interface BaseFormInputProps extends InputProps {
	className?: string
}

export type FormInputProps = BaseFormInputProps &
	IFormComponentProps

function FormInput({
	label,
	fieldName,
	className,
	dependOn,
	isVisible,
	calculateValue,
	type = "text",
	suffix,
	...inputProps
}: FormInputProps) {
	const { control } = useFormWrapper()
	const id = useId()

	const [isPassword, setIsPassword] = useState(
		type == "password",
	)

	function changeVisibility() {
		setIsPassword(!isPassword)
	}

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
					<Input
						placeholder={label}
						id={id}
						{...field}
						{...inputProps}
						type={
							type == "password"
								? isPassword
									? "password"
									: "text"
								: type
						}
						suffix={
							type == "password" ? (
								<SeePassword
									handleChange={
										changeVisibility
									}
									isVisible={isPassword}
								/>
							) : (
								suffix
							)
						}
					/>
				)}
			/>
		</ComponentWrapper>
	)
}

function SeePassword(props: {
	isVisible: boolean
	handleChange: () => void
}) {
	return (
		<div
			className={"cursor-pointer"}
			onClick={props.handleChange}
		>
			{props.isVisible ? (
				<EyeInvisibleOutlined />
			) : (
				<EyeOutlined />
			)}
		</div>
	)
}

export default FormInput
