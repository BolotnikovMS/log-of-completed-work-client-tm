import { useMutation } from '@tanstack/react-query'
import { IChangePassword } from '../../interfaces'
import { AuthService } from '../../services/auth/auth.service'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: IChangePassword) => AuthService.changePassword(data),
    onSuccess: (data) => {
      toast.success(data.data)
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
