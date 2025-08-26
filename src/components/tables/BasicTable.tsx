import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from '@tanstack/react-table'
import { useState, type FC } from 'react'
import { Button, Group, Icon, Input } from '..'
import { IPropsBasicTable } from './basicTable.interface'
import './table.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BasicTable: FC<IPropsBasicTable<any, any>> = ({ columns, data = [], search, size, title, query, serverSidePagination = false, onPageChange, currentPage = 1 }) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: serverSidePagination ? currentPage - 1 : 0,
		pageSize: size || 5,
	})
	const [filtering, setFiltering] = useState('')
	const tableData = serverSidePagination ? query?.data || [] : data
	const totalRecords = serverSidePagination ? query?.meta.total || 0 : data.length
	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (serverSidePagination) {
				const newPagination = typeof updater === 'function'
					? updater(pagination)
					: updater
				setPagination(newPagination)
				onPageChange?.(newPagination.pageIndex + 1)
			} else {
				setPagination(updater)
			}
		},
		state: {
			sorting,
			globalFilter: filtering,
			pagination: serverSidePagination
				? { ...pagination, pageIndex: currentPage - 1 } // Синхронизируем с внешним состоянием
				: pagination,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
		manualPagination: serverSidePagination,
		pageCount: serverSidePagination
			? Math.ceil(totalRecords / (size || 5))
			: undefined,
	})

	return (
		<>
			<div className='table-wrapper'>
				{title && <h3 className="title-1">{title}</h3>}
				{search && (
					<div className='table-controls'>
						<Group>
							<Input
								type='search'
								classInput='!input-sm'
								value={filtering}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltering(e.target.value)}
								placeholder='Поиск по таблице...'
								iconLeft={<Icon id='search' />}
							/>
						</Group>
					</div>
				)}
				<table className='mTable'>
					<thead>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th
										key={header.id}
										onClick={header.column.getToggleSortingHandler()}
										className='text-title text-center'
									>
										<Group className='!flex-row justify-center'>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{{
												asc: <Icon id='sort-asc' />,
												desc: <Icon id='sort-desc' />
											}[header.column.getIsSorted() as string] ?? null}
										</Group>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className='text-content'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				{totalRecords > pagination.pageSize && (
					<div className='table-pagination'>
						<Button
							disabled={!table.getCanPreviousPage()}
							onClick={() => {
								if (serverSidePagination) {
									onPageChange?.(currentPage - 1)
								} else {
									table.previousPage()
								}
							}}
						>
							<Icon id='arrow-left' />
						</Button>

						<span className='text-lg'>
							Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount() || 1}
							{serverSidePagination && totalRecords && ` (всего: ${totalRecords})`}
						</span>

						<Button
							disabled={!table.getCanNextPage()}
							onClick={() => {
								if (serverSidePagination) {
									onPageChange?.(currentPage + 1)
								} else {
									table.nextPage()
								}
							}}
						>
							<Icon id='arrow-right' />
						</Button>
					</div>
				)}
			</div>
		</>
	)
}

export default BasicTable
