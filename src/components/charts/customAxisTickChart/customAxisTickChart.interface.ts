import { ReactNode } from 'react'
import { Payload } from 'recharts/types/component/DefaultLegendContent'
import { TTextAnchor } from '../../../types/charts.type'

export interface ICustomAxisTickChart {
  x: number
  y: number
  payload: Payload | undefined
  labelClass?: string
  textAnchor?: TTextAnchor
  valueSeparator?: string
  linkTemplate?: (name: string) => string
  renderValue?: (qsParam: string, name: string) => ReactNode
}
