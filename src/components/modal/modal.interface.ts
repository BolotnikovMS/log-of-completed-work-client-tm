import { ReactNode } from 'react'

export interface IPropsModal {
  visible: boolean
  title: string
  content: ReactNode | string
  footer?: ReactNode | string
  classDialog?: string
  onToggle: () => void
}
