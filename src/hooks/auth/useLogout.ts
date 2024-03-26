import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeTokenFromLocalStorage } from '../../helpers/localstorege.helper'
import { AuthService } from '../../services/auth/auth.service'
import { useAuthStore } from '../../store/auth'

export const useLogout = () => {
	const userAuthStore = useAuthStore()
	const navigate = useNavigate()
  const queryClient = useQueryClient()
	const logout = useMutation({
		mutationFn: () => {
			userAuthStore.setRequestLoading(true)
			
			return AuthService.logout()
		},
			onSuccess: (data) => {
				userAuthStore.setRequestLoading(false)
				userAuthStore.setAuthUser(null)
				removeTokenFromLocalStorage('user_token')
				useAuthStore.persist.clearStorage()
				queryClient.removeQueries()
				toast.success(data.message)
				navigate('/sign-in')
			},
			onError: (err: AxiosError<string>) => {
				userAuthStore.setRequestLoading(false)
				toast.error(err.response?.data)
				navigate('/sign-in')
			}
		})

	return { logout }
}