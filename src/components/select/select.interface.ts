import { ReactNode } from 'react'

export interface IPropsSelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
	className?: string
	children: ReactNode
}
