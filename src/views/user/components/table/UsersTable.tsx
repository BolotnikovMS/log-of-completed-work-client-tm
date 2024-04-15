import { ColumnDef } from '@tanstack/react-table'
import { Settings } from 'lucide-react'
import { type FC } from 'react'
import { Error, Loader } from '../../../../components'
import { BasicTable } from '../../../../components/tables/BasicTable'
import { useUsers } from '../../../../hooks'
import { IUser } from '../../../../interfaces'

export const UsersTable: FC = () => {
	const { data, error, isError, isLoading } = useUsers()
	const columns: ColumnDef<IUser>[] = [
		{
			header: 'Ф.И.О.',
			accessorKey: 'shortName',
		},
		{
			header: 'Должность',
			accessorKey: 'position',
		},
		{
			header: 'УЗ активна',
			accessorFn: row => row.active ? '✅' : '⛔️'
		},
		{
			header: 'Username',
			accessorKey: 'username',
		},
		{
			header: 'email',
			accessorKey: 'email',
		},
		{
			header: 'Роль',
			accessorFn: row => row.role.name
		},
		{
			header: '⚙️',
			enableSorting: false,
			accessorKey: 'setting',
			cell: () =>  (<Settings />)
		}
	]

	if (isError && error) return <Error error={error}/>

	if (isLoading) return <Loader />

	return (
		<BasicTable data={data!.data} columns={columns} />
	)
}
