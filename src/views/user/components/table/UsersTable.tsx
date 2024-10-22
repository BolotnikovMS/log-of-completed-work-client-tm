import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState, type FC } from 'react'
import { ChangeStatusAccountForm } from '..'
import { BasicTable, Button, ChangePasswordForm, Error, Icon, InfoMessage, Loader, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers'
import { useModal, useUsers } from '../../../../hooks'
import { IUser } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import ChangeUserRole from '../form/changeUserRole/ChangeUserRole'

const UsersTable: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { data, error, isError, isLoading } = useUsers({})
  const { isModal, toggleModal } = useModal()
  const { isModal: isModalChangeRole, toggleModal: toggleModalChangeRole } = useModal()
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
        isAdmin && <ChangeStatusAccountForm active={row.original.active} id={row.original.id} />
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
      cell: ({ row }) => (
        isAdmin && (
          <div className='table-cell-row'>
            {row.original.role?.name}
            <Button title='Изменить роль пользователя' onClick={() => { toggleModalChangeRole(), setCurrentUser(row.original) }}>
              <Icon id='user-switch' />
            </Button>
          </div>
        )
      )
    },
    {
      header: () => <Icon id='setting' />,
      enableSorting: false,
      accessorKey: 'setting',
      cell: ({ row }) => (
        isAdmin && (
          <div className='table-cell-row'>
            <Button title='Изменить пароль' onClick={() => { toggleModal(), setCurrentUser(row.original) }}>
              <Icon id='key' />
            </Button>
          </div>
        )
      )
    }
  ], [])

  if (isError && error) return <Error error={error} />

  if (isLoading) return <Loader />

  if (!data?.data) return <InfoMessage text='Пока нет данных для отображения!' />

  return (
    <>
      <BasicTable data={data.data} columns={columns} size={15} search />
      <Modal
        visible={isModal}
        title='Форма сброса пароля'
        content={<ChangePasswordForm toggleModal={toggleModal} isResetPassword user={currentUser} />}
        onToggle={toggleModal}
      />
      <Modal
        visible={isModalChangeRole}
        title='Форма изменения роли пользователя'
        classDialog='!h-[350px]'
        content={<ChangeUserRole toggleModal={toggleModalChangeRole} data={currentUser} />}
        onToggle={toggleModalChangeRole}
      />
    </>
  )
}

export default UsersTable
