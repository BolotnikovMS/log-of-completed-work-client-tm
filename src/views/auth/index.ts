import { lazy } from 'react'
import { SignIn } from './SignIn'

const Profile = lazy(() => import('./Profile'))
const ProfileControl = lazy(() => import('./components/control/ProfileControl'))

export { Profile, ProfileControl, SignIn }
