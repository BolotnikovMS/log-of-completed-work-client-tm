import { ReactNode } from 'react'

export interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  validation?: { [key: string]: unknown }
  errorMessage?: string
  label?: string
  mandatory?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  classLabel?: string
  classInput?: string
  classWrapper?: string
}
