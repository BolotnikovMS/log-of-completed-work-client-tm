import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useMemo, useState, type FC } from 'react'
import { Badge, BasicTable, Error, InfoMessage, Loader, NumberRecords } from '../../../../../components'
import { useLogs } from '../../../../../hooks'
import { TLogShort } from '../../../../../types/log.types'

const LogsTable: FC = () => {
	const [page, setPage] = useState(1)
	const limit = 15
	// const[action, setAction] = useState<string | undefined>(undefined)
	const { data, isError, error, isLoading } = useLogs({ page, limit })
	const columns = useMemo<ColumnDef<TLogShort>[]>(() => [
		{
			header: 'ID',
			accessorKey: 'id'
		},
		{
			header: 'Дата',
			accessorKey: 'createdAt',
			cell: ({ row }) => (
				moment(row.original.createdAt).format('HH:mm:ss DD.MM.yyyy')
			)
		},
		{
			header: 'user',
			accessorKey: 'user'
		},
		{
			header: 'url',
			accessorKey: 'url'
		},
		{
			header: 'method | action',
			accessorKey: 'method',
			cell: ({ row }) => (
				<div className='flex items-center justify-center gap-3'>
					<Badge text={row.original.method || 'none'} className='mBadge_blue' />
					<Badge text={row.original.action} className='mBadge_red' />
				</div>
			)
		}
	], [])

	if (isError && error) return <Error error={error} />
	if (isLoading) return <Loader />
	if (data?.meta.total === 0) return <InfoMessage text='Пока нет данных для отображения!' />

	return (
		<>
			<NumberRecords text='Всего записей:' numberRecords={data?.meta.total} />
			<BasicTable
				columns={columns}
				query={data}
				serverSidePagination={true}
				currentPage={page}
				onPageChange={setPage}
				size={limit}
			/>
		</>
	)
}

export default LogsTable
