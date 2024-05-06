import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { ArrowDown01, ArrowDown10, ArrowLeft, ArrowLeftToLine, ArrowRight, ArrowRightToLine, Search } from 'lucide-react'
import { useState, type FC } from 'react'
import { Button, Group } from '..'
import InputTest from '../input/Input'
import { IPropsBasicTable } from './basicTable.interface'
import styles from './table.module.scss'

export const BasicTable: FC<IPropsBasicTable> = ({ data, columns }) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [filtering, setFiltering] = useState('')
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			globalFilter: filtering
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
	})

	return (
		<>
			<div className={styles.controls}>
				<Group className='group-row'>
					<InputTest type='search' value={filtering} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltering(e.target.value)} placeholder='Поиск по таблице...' iconLeft={<Search />} />
				</Group>
			</div>
			<table className={styles.table}>
				<thead>
					{
						table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => 
									<th key={header.id} onClick={header.column.getToggleSortingHandler()}>
										<Group className='group-center'>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{
												{asc: <ArrowDown01 />, desc: <ArrowDown10 />}[header.column.getIsSorted() as string] ?? null
											}
										</Group>
									</th>)}
							</tr>
						))
					}
				</thead>
				<tbody>
					{
						table.getRowModel().rows.map(row => (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))
					}
				</tbody>
			</table>
			<div className={styles['table-pagination']}>
				<Button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
					<ArrowLeftToLine />
				</Button>
				<Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
					<ArrowLeft />
				</Button>
				<Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
					<ArrowRight />
				</Button>
				<Button disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
					<ArrowRightToLine />
				</Button>
			</div>
		</>
	)
}
