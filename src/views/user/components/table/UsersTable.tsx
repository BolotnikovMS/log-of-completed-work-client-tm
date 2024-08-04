import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState, type FC } from 'react'
import { ChangeStatusAccountForm } from '..'
import { BasicTable, Button, ChangePasswordForm, Error, InfoMessage, Loader, Modal } from '../../../../components'
import { useModal, useUsers } from '../../../../hooks'
import { Key, Setting } from '../../../../icons'
import { IUser } from '../../../../interfaces'

const UsersTable: FC = () => {
  const { data, error, isError, isLoading } = useUsers({})
  const { isModal, toggleModal } = useModal()
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined)
  const columns = useMemo<ColumnDef<IUser>[]>(() => [
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
      accessorKey: 'active',
      cell: ({ row }) => (
        <ChangeStatusAccountForm active={row.original.active} userId={row.original.id} />
      )
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
      header: () => <Setting className='icon' />,
      enableSorting: false,
      accessorKey: 'setting',
      cell: ({ row }) => (
        <div className='table-cell-row'>
          <Button title='Изменить пароль' onClick={() => { toggleModal(), setCurrentUser(row.original) }}>
            <Key className='icon' />
          </Button>
        </div>
      )
    }
  ], [])

  if (isError && error) return <Error error={error} />

  if (isLoading) return <Loader />

  if (!data?.data) return <InfoMessage text='Пока нет данных для отображения!' />

  return (
    <>
      <BasicTable data={data.data} columns={columns} search />
      <Modal
        visible={isModal}
        title='Форма сброса пароля'
        content={<ChangePasswordForm toggleModal={toggleModal} isResetPassword user={currentUser} />}
        onToggle={toggleModal}
      />
    </>
  )
}

export default UsersTable
