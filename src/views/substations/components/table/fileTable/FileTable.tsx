import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useMemo, type FC } from 'react'
import { BasicTable, Button, Icon, Loader } from '../../../../../components'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers'
import { useDeleteFile } from '../../../../../hooks'
import { IFile } from '../../../../../interfaces'
import { FileService } from '../../../../../services/file/file.service'
import { useAuthStore } from '../../../../../store/auth'

const FileTable: FC <{files: IFile[]}> = ({ files }) => {
	const { authUser } = useAuthStore()
	const { deleteFile } = useDeleteFile()
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
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
			header: 'Автор',
			accessorKey: 'author',
			cell: ({row}) => (
				row.original.author
			)
		},
		{
			header: () => <Icon id='setting' />,
			enableSorting: false,
			accessorKey: 'setting',
			cell: ({row}) =>  {
				return (
					<div className='table-cell-row'>
						<Button onClick={() => handleDownload(row.original)} title='Скачать файл'>
							<Icon id='download'/>
						</Button>
						{isAdminOrModerator && (
							<Button className='mBtn_error' onClick={() => handleDelete(row.original.id)} title='Удалить файл'>
								<Icon id='delete' />
							</Button>
						)}
					</div>
				)
			}
		}
	], [])

  if (deleteFile.isPending) return <Loader />

	return (
		<BasicTable data={files} columns={columns} />
	)
}

export default FileTable
