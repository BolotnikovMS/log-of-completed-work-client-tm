import { ReactNode, type FC } from 'react'
import { Navigate } from 'react-router-dom'

interface IProtectedRouteProps {
	isAllowed: boolean
	children: ReactNode
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ isAllowed, children }) => {
	return isAllowed ? children :  <Navigate to={'/sign-in'} />
}
