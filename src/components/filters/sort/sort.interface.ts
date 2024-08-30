import { TOrderSort } from "../../../types/order.types"

export interface ISortOption {
  value: string
  label: string
  icon: React.ReactNode
  order: TOrderSort
}

export interface IPropsSort {
  orderSort: TOrderSort
  sort: string
  sortOptions: ISortOption[]
}
