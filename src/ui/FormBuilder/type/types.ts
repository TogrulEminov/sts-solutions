export interface FormComponentsProps {
	label?: string
	fieldName: string
	// initialValue?: string,
}

export interface FormRangeProps {
	label: string
	fieldName: [string, string]
	// initialValue?: string,
}

export type ComponentWrapperDependOnProps = {
	dependOn?: string[]
	isVisible?: (values: any[]) => boolean
	calculateValue?: (values: any[]) => any
}

export type DependOnProps =
	| {
			dependOn: string[]
			isVisible?: (values: any[]) => boolean
			calculateValue?: (values: any[]) => any
	  }
	| {
			dependOn?: never
			isVisible?: undefined
			calculateValue?: never
	  }

export type IFormComponentProps = FormComponentsProps &
	DependOnProps
export type IFormRangeComponentProps = FormRangeProps &
	DependOnProps
