import { ColumnDef } from '@tanstack/react-table'
import { useMemo, type FC } from 'react'
import { ChangeStatusAccountForm } from '..'
import { Badge, BasicTable, Error, Icon, InfoMessage, Loader } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers'
import { useUsers } from '../../../../hooks'
import { IUser } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import ControlMenu from './parts/control/ControlMenu'

const UsersTable: FC = () => {
	const { authUser } = useAuthStore()
	const isAdmin = checkRole(authUser, [ERoles.Admin])
	const { data, error, isError, isLoading } = useUsers({})
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
		<BasicTable data={data.data} columns={columns} size={15} search />
	)
}

export default UsersTable
