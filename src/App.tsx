// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from './helpers/localstorege.helper'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Router } from './components/routing/Router'
import { AuthService } from './services/auth/auth.service'
import { useAuthStore } from './store/auth'

export const App = () => {
	const userAuthStore = useAuthStore()
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	
	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		
		userAuthStore.setRequestLoading(true)
		
		try {
			if (token && Date.now() < Date.parse(token.expiresIn)) {
				const data = await AuthService.getProfile()

				if (data) {
					userAuthStore.setAuthUser(data)
				} else {
					console.log('Error auth')
					userAuthStore.setAuthUser(null)
				}
			} else {
				userAuthStore.setAuthUser(null)
				removeTokenFromLocalStorage('user_token')
				queryClient.removeQueries()
				navigate('/sign-in')
			}
		} catch (error) {
			console.log(error)
		} finally {
			userAuthStore.setRequestLoading(false)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])
	
  return (
    <Router />
  )
}

