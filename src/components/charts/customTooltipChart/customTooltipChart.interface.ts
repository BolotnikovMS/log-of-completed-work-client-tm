import { Payload } from 'recharts/types/component/DefaultTooltipContent'

type TName = string
type TValue = string

export interface IPropsCustomTooltip {
  active: boolean
  payload: Payload<TValue, TName>[]
  labelKey: string
  valueKey: string
  labelText?: string
  tooltipClassName?: string
  labelClassName?: string
  valueClassName?: string
}
