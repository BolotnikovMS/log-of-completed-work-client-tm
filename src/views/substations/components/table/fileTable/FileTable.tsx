import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useMemo, type FC } from 'react'
import { BasicTable, Icon } from '../../../../../components'
import { IFile } from '../../../../../interfaces'
import { TFile } from '../../../../../types'
import FileControl from '../../control/fileControl/FileControl'

const FileTable: FC<{ files: TFile[] }> = ({ files }) => {
	const columns = useMemo<ColumnDef<IFile>[]>(() => [
		{
			header: 'Дата добавления',
			accessorKey: 'createdAt',
			accessorFn: row => moment(row.createdAt, 'yyyy-MM-DD').format('DD.MM.yyyy')
		},
		{
			header: 'Название',
			accessorKey: 'clientName',
		},
		{
			header: 'Размер (Кб)',
			accessorKey: 'size'
		},
		{
			header: 'Автор',
			accessorKey: 'author',
			cell: ({ row }) => (
				row.original.author
			)
		},
		{
			header: () => <Icon id='setting' />,
			enableSorting: false,
			accessorKey: 'setting',
			cell: ({ row }) => {
				return (
					<div className='table-cell-row'>
						<FileControl file={row.original} />
					</div>
				)
			}
		}
	], [])

	return (
		<BasicTable data={files} columns={columns} />
	)
}

export default FileTable
