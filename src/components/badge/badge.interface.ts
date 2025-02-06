import { HTMLAttributes } from 'react'

export interface IPropsBadge extends HTMLAttributes<HTMLDivElement> {
	text: string | number
}
