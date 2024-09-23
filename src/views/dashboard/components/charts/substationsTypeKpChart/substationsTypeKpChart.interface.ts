import { Payload } from 'recharts/types/component/DefaultLegendContent'

export interface ICustomBarLabel {
  x: number
  y: number
  width: number
  value: number
}

export interface ICustomAxisTick {
  x: number
  y: number
  payload: Payload
}
