import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeTokenFromLocalStorage } from '../../helpers/localstorege.helper'
import { AuthService } from '../../services/auth/auth.service'

export const useLogout = () => {
	const navigate = useNavigate()
  const queryClient = useQueryClient()
	const logout = useMutation({
		mutationFn: () => AuthService.logout(),
			onSuccess: (data) => {
				console.log(data);
				removeTokenFromLocalStorage('user_token')
				queryClient.removeQueries()
				navigate('/sign-in')
			},
			onError: (err: AxiosError<string>) => {
				toast.error(err.response?.data)
				navigate('/sign-in')
			}
		})

	return { logout }
}