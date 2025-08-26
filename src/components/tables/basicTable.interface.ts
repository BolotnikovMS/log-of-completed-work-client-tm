import { ColumnDef } from '@tanstack/react-table'
import { IMeta } from '../../interfaces'

export interface IPropsBasicTable<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data?: unknown[]
	search?: boolean
	size?: number
	title?: string
	query?: { data: TData, meta: IMeta }
	serverSidePagination?: boolean
	onPageChange?: (page: number) => void
	currentPage?: number
}
