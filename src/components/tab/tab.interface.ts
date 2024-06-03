import { ReactNode } from 'react'

export interface IPropsTab {
	tabs: {
		id: string | number
		label: string
		content: ReactNode
	}[]
}