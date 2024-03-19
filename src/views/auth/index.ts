import { lazy } from 'react'
import { SignIn } from './SignIn'

const Profile = lazy(() => import('./Profile'))

export { Profile, SignIn }
