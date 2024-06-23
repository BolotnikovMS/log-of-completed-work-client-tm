import { TOrderSort } from '../types/order.types'

export interface IQueryParams {
  page?: number
  size?: number
  search?: string
  sort?: string
  order?: TOrderSort
  offset?: number
  limit?: number
	substation?: string | null
	active?: boolean
	cleanUser?: boolean
}