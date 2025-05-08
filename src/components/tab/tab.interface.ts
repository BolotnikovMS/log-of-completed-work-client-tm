import { ReactNode } from 'react'

interface ITab {
  id: string
  label: string
  content: ReactNode
  icon?: ReactNode
}

export interface IPropsTab {
  tabs: ITab[]
  classContainer?: string
  classTab?: string
}
