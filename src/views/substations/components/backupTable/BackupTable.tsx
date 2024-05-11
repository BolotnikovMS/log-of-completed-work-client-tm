import { ColumnDef } from '@tanstack/react-table'
import { ArrowDownToLine } from 'lucide-react'
import moment from 'moment'
import { useMemo, type FC } from 'react'
import { BasicTable } from '../../../../components'
import { IFile } from '../../../../interfaces'

interface IPropsBackupTable {
	backupFiles: IFile[]
}

const BackupTable: FC<IPropsBackupTable> = ({backupFiles}) => {
		const columns = useMemo<ColumnDef<IFile>[]>(() => [
		{
			header: 'Дата добавления',
			accessorKey: 'createdAt',
			accessorFn: row => moment(row.createdAt, 'yyyy-MM-DD').format('DD.MM.yyyy')
		},
		{
			header: 'Название',
			accessorKey: 'clientName',
			cell: ({row}) => {
				return (
					<>
						<a href={`${row.original.filePath}`} className='link link-jcc'>
							{row.original.clientName}
							<ArrowDownToLine className='lucide'/>
						</a>
					</>
				)
			},
		},
		{
			header: 'Размер (Кб)',
			accessorKey: 'size'
		},
	], [])

	return (
		<BasicTable data={backupFiles.filter(file => file.typeFile === 'backup')} columns={columns} title='Backups' />
	)
}

export default BackupTable