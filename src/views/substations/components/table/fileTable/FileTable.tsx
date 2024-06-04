import { ColumnDef } from '@tanstack/react-table'
import { ArrowDownToLine, Trash2 } from 'lucide-react'
import moment from 'moment'
import { useMemo, type FC } from 'react'
import { BasicTable, Button } from '../../../../../components'
import { useDeleteFile } from '../../../../../hooks'
import { IFile } from '../../../../../interfaces'
import { FileService } from '../../../../../services/file/file.service'
import { IPropsFileTable } from './fileTable.interface'

const FileTable: FC <IPropsFileTable>= ({files}) => {
	const { deleteFile } = useDeleteFile()
	const handleDownload = (file: IFile) => FileService.download(file)
	const handleDelete = (id: number) => {
		const answer = confirm('Подтвердите удаление записи.')

		if (!answer) return null

		return deleteFile.mutate(id)
	}
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
			header: '⚙️',
			enableSorting: false,
			accessorKey: 'setting',
			cell: ({row}) =>  {
				return (
					<div className='table-cell-row'>
						<Button onClick={() => handleDownload(row.original)} title='Скачать файл'>
							<ArrowDownToLine className='lucide'/>
						</Button>
						<Button classBtn='btn-bg_red' onClick={() => handleDelete(row.original.id)} title='Удалить файл'>
							<Trash2 />
						</Button>
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