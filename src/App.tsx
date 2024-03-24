// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from './helpers/localstorege.helper'

import { AuthService } from './services/auth/auth.service'
import { Router } from './components/routing/Router'
import { useAuthStore } from './store/auth'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const App = () => {
	const userAuthStore = useAuthStore()
	const queryClient = useQueryClient()
	
	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		
		try {
			if (token && Date.now() < Date.parse(token.expiresIn)) {
				userAuthStore.setRequestLoading(true)
				const data = await AuthService.getProfile()

				if (data) {
					userAuthStore.setAuthUser(data)
					userAuthStore.setRequestLoading(false)
				} else {
					console.log('Error auth');
					userAuthStore.setAuthUser(null)
					userAuthStore.setRequestLoading(false)
				}
			} else {
				userAuthStore.setAuthUser(null)
				userAuthStore.setRequestLoading(false)
				removeTokenFromLocalStorage('user_token')
				queryClient.removeQueries()
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])
	
  return (
    <Router />
  )
}

