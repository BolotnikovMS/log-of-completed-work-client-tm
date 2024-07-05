import { lazy } from 'react'

const UserForm = lazy(() => import('./form/UserForm'))
const UserControl = lazy(() => import('./control/UserControl'))
const UsersTable = lazy(() => import('./table/UsersTable'))
const ChangeStatusAccountForm = lazy(() => import('./form/blockUser/ChangeStatusAccountForm'))

export { UserControl, UserForm, UsersTable, ChangeStatusAccountForm }
