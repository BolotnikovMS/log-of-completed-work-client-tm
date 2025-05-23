import { type ReactNode } from 'react'

export interface IPropsCard {
  childrenHeader?: ReactNode
  childrenContent?: ReactNode
  childrenFooter?: ReactNode
  childrenControl?: ReactNode
  className?: string
  classBody?: string
  classContent?: string
  path?: string
  onClick?: () => void
}
