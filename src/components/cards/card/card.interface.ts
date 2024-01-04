import { type ReactNode } from 'react'

export interface IPropsCard {
	childrenHeader?: ReactNode
	childrenBody?: ReactNode
	childrenFooter?: ReactNode
	childrenControl?: ReactNode
	className?: string
	path?: string
}