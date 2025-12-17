import { createContext } from "react"
import type { UseFormReturn } from "react-hook-form"

export const FormProvider = createContext<
	| { form: UseFormReturn; searchParamsKey?: string }
	| undefined
>(undefined)
