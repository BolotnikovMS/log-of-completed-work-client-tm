import { lazy } from 'react'
const UserForm = lazy(() => import('./form/userForm/UserForm'))
const UserControl = lazy(() => import('./control/UserControl'))
const UsersTable = lazy(() => import('./table/UsersTable'))
const ChangeStatusAccountForm = lazy(() => import('./form/blockUser/ChangeStatusAccountForm'))
const IPropsChangeUserRole = lazy(() => import('./form/changeUserRole/ChangeUserRole'))

export { ChangeStatusAccountForm, IPropsChangeUserRole, UserControl, UserForm, UsersTable }
