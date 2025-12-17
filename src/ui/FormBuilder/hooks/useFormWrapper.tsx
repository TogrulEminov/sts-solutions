import { FormProvider } from "../FormWrapper/FormProvider"
import { use } from "react"

export function useFormWrapper(name?: string) {
	const form = use(FormProvider)
	if (!form)
		throw new Error(
			`Component ${name}: FormWrapper daxilində olmalıdır!`,
		)
	return {
		...form.form,
	}
}
