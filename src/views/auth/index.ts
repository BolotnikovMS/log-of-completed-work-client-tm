import { lazy } from 'react'
import { SignIn } from './SignIn'

const Profile = lazy(() => import('./Profile'))
const ProfileControl = lazy(() => import('./components/control/ProfileControl'))
const ChangePasswordForm = lazy(() => import('./components/form/ChangePasswordForm'))

export { ChangePasswordForm, Profile, ProfileControl, SignIn }

