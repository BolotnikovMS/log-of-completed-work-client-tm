import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from '@tanstack/react-table'
import { useState, type FC } from 'react'
import { Button, Group, Icon, Input } from '..'
import { IPropsBasicTable } from './basicTable.interface'
import './table.scss'

const BasicTable: FC<IPropsBasicTable> = ({ data, columns, search, size, title }) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: size || 5,
	})
	const [filtering, setFiltering] = useState('')
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: setPagination,
		state: {
			sorting,
			globalFilter: filtering,
			pagination,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
	})

	return (
		<>
			<div className='table-wrapper'>
				{title && (
					<h3 className="title-1">{title}</h3>
				)}
				{search && (
					<div className='table-controls'>
						<Group>
							<Input type='search' classInput='!input-sm' value={filtering} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltering(e.target.value)} placeholder='Поиск по таблице...' iconLeft={<Icon id='search' />} />
						</Group>
					</div>
				)}
				<table className='mTable'>
					<thead>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header =>
									<th key={header.id} onClick={header.column.getToggleSortingHandler()} className='text-title text-center'>
										<Group className='!flex-row justify-center'>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{{ asc: <Icon id='sort-asc' />, desc: <Icon id='sort-desc' /> }[header.column.getIsSorted() as string] ?? null}
										</Group>
									</th>)}
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
				<div className='table-pagination'>
					{data.length > pagination.pageSize && (
						<>
							<Button disabled={!table.getCanPreviousPage()} onClick={() => table.firstPage()}>
								<Icon id='arrow-left-line' />
							</Button>
							<Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
								<Icon id='arrow-left' />
							</Button>
							<Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
								<Icon id='arrow-right' />
							</Button>
							<Button disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
								<Icon id='arrow-right-line' />
							</Button>
						</>
					)}
					{/* <select
						className={styles['pagination-show']}
						value={table.getState().pagination.pageSize}
						onChange={e => table.setPageSize(+e.target.value)}
					>
						{[5, 10, 30].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Показать: {pageSize}
							</option>
						))}
					</select> */}
				</div>
			</div>
		</>
	)
}

export default BasicTable
