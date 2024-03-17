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
		mutationFn: () => AuthService.logout(),
			onSuccess: (data) => {
				userAuthStore.setAuthUser(null)
				removeTokenFromLocalStorage('user_token')
				queryClient.removeQueries()
				toast.success(data.message)
				navigate('/sign-in')
			},
			onError: (err: AxiosError<string>) => {
				toast.error(err.response?.data)
				navigate('/sign-in')
			}
		})

	return { logout }
}