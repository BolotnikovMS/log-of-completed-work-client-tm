import { ReactNode } from 'react'

export interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
	iconLeft?: ReactNode
	iconRight?: ReactNode
	error?:  boolean
}