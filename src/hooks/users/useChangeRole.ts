import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { IUserRole } from '../../interfaces'
import { UserService } from '../../services/user/user.service'

export const useChangeRole = (userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IUserRole) => UserService.changeUserRole(userId, data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['user', userId] })
      await queryClient.invalidateQueries({ queryKey: ['users'] })

      toast.success(data.data)
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
