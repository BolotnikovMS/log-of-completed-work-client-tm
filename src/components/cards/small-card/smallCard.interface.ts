import { type ReactNode } from 'react'

export interface IPropsSmallCard {
  childrenContent?: ReactNode
  childrenFooter?: ReactNode
  childrenControl?: ReactNode
  className?: string
  classContent?: string
  cardText?: string
  path?: string
}
