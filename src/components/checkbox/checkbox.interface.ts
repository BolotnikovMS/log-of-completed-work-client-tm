import { InputHTMLAttributes } from 'react'

export interface IPropsCheckbox extends InputHTMLAttributes<HTMLInputElement> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register?: any
	validation?: { [key: string]: unknown }
	classLabel?: string
	textLabel?: string
	classLabelText?: string
	classInput?: string
	errorMessage?: string
	mandatory?: boolean
}