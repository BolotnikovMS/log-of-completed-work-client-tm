import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { IChangePassword } from '../../interfaces'
import { UserService } from '../../services/user/user.service'

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: IChangePassword }) => UserService.resetPassword(id, data),
    onSuccess: (data) => {
      toast.success(data.data)
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
