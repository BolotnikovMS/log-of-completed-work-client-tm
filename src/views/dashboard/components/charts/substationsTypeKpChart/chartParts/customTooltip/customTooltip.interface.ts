import { Payload } from 'recharts/types/component/DefaultTooltipContent'

type TName = string
type TValue = string

export interface ICustomTooltip {
  active: boolean
  payload: Payload<TValue, TName>[]
}
