// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { useEffect } from 'react'
import { Router } from './components/routing/Router'
import { getTokenFromLocalStorage } from './helpers/localstorege.helper'
import { AuthService } from './services/auth/auth.service'
import { useAuthStore } from './store/auth'

export const App = () => {
	const userAuthStore = useAuthStore()
	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		
		try {
			if (token) {
				userAuthStore.setRequestLoading(true)
				const data = await AuthService.getProfile()

				if (data) {
					userAuthStore.setAuthUser(data)
					userAuthStore.setRequestLoading(false)
				} else {
					userAuthStore.setAuthUser(null)
					userAuthStore.setRequestLoading(false)
				}
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

