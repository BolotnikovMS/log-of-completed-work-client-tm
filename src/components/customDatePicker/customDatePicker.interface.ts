import { ReactNode } from 'react'
import { ReactDatePickerProps } from 'react-datepicker'

export interface IPropsCustomDatePicker extends ReactDatePickerProps {
	className?: string 
	iconLeft?: ReactNode
	iconRight?: ReactNode
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errorMessage?: string
	register: any
	validation?: { [key: string]: unknown }
}