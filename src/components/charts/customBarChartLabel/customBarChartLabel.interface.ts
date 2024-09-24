import { TTextAnchor } from '../../../types/charts.type'

export interface ICustomBarChartLabel {
  x: number
  y: number
  width: number
  value: number
  textAnchor?: TTextAnchor
  labelClass?: string
}
