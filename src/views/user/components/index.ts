import { lazy } from 'react'

const UserForm = lazy(() => import('./form/UserForm'))
const UserControl = lazy(() => import('./control/UserControl'))
const UsersTable = lazy(() => import('./table/UsersTable'))

export { UserControl, UserForm, UsersTable }
