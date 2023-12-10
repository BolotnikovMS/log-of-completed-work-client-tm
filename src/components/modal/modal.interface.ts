import { ReactElement } from 'react'

export interface IPropsModal {
  visible: boolean
  title: string
  content: ReactElement | string
  footer?: ReactElement | string
  onClose: () => void
}