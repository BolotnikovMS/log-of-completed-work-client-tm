import { HTMLAttributes, ReactNode } from 'react'

export interface IPropsTooltip extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	text: string
}
