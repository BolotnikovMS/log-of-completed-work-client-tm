import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useMemo, type FC } from 'react'
import { BasicTable, Button, Icon } from '../../../../../components'
import { IFile } from '../../../../../interfaces'
import { FileService } from '../../../../../services/file/file.service'
import { TFileList } from '../../../../../types'
import FileDelete from '../../control/fileControl/FileDelete'

const FileTable: FC<{ files: TFileList[] }> = ({ files }) => {
	const handleDownload = (file: IFile) => FileService.download(file)
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
						<Button onClick={() => handleDownload(row.original)} title='Скачать файл'>
							<Icon id='download' />
						</Button>
						<FileDelete file={row.original} />
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
