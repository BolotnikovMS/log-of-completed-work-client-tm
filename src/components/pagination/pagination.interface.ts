import { IMeta } from '../../interfaces'

export interface IPropsPagination {
  meta: IMeta
  page: number
  setPage: (val: number) => void
}
