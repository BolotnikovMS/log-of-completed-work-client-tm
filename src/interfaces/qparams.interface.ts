import { TOrderSort } from '../types/order.types'

export interface IQueryParams {
  page?: number
  size?: number
  search?: string | null
  sort?: string | null
  order?: TOrderSort | null
  offset?: number
  limit?: number
  substation?: string | null
  active?: boolean
  cleanUser?: boolean
  executor?: string | null
  dateStart?: string | null | Date
  dateEnd?: string | null | Date
  typeKp?: string | null
  headController?: string | null
  mainChannel?: string | null
  backupChannel?: string | null
  district?: string | null
  channelType?: string | null
  channelCategory?: string | null
  typeWork?: string | null
}
