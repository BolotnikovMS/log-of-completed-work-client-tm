import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChangeStatusAccountForm } from '..'
import { Badge, BasicTable, Error, Icon, InfoMessage, Loader } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers'
import { useUsers } from '../../../../hooks'
import { IUser } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import ControlMenu from './parts/control/ControlMenu'

const UsersTable: FC = () => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const limit = 12
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPage] = useState<number>(Number(searchParams.get(EFilterParam.page)) || 1)
	const { data, error, isError, isLoading } = useUsers({ limit, page })

	useEffect(() => {
		if (!data) return

		const { meta } = data

		if (meta.currentPage > meta.lastPage) {
			setPage(1)

			return
		}

		if (meta.firstPage !== meta.lastPage && meta.currentPage !== 1) {
			searchParams.set(EFilterParam.page, page.toString())
			setSearchParams(searchParams)
		} else {
			searchParams.delete(EFilterParam.page)
			setSearchParams(searchParams)
		}
	}, [data, page, searchParams, setSearchParams])

	const columns = useMemo<ColumnDef<IUser>[]>(() => [
		{
			header: 'Ф.И.О.',
			accessorKey: 'shortName',
		},
		{
			header: 'Username',
			accessorKey: 'username',
		},
		{
			header: 'Роль',
			accessorKey: 'role',
			cell: ({ row }) => (
				<Badge text={String(row.original.role)} className='mBadge_blue' />
			)
		},
		{
			header: 'УЗ активна',
			accessorKey: 'active',
			cell: ({ row }) => (
				isAdmin && <ChangeStatusAccountForm active={row.original.active} id={row.original.id} />
			)
		},
		{
			header: 'email',
			accessorKey: 'email',
		},
		{
			header: () => <Icon id='setting' />,
			enableSorting: false,
			accessorKey: 'setting',
			cell: ({ row }) => (
				(isAdmin && row.original.active) && (
					<ControlMenu userId={row.original.id} />
				)
			)
		}
	], [isAdmin])

	if (isError && error) return <Error error={error} />
	if (isLoading) return <Loader />
	if (!data?.data) return <InfoMessage text='Пока нет данных для отображения!' />

	return (
		<BasicTable query={data} serverSidePagination={true} columns={columns} size={limit} currentPage={page} onPageChange={setPage} />
	)
}

export default UsersTable
