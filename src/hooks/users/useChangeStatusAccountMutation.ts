import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { UserService } from '../../services/user/user.service'
import { TChangeStatusAccount } from '../../types'

export const useChangeStatusAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TChangeStatusAccount) => UserService.changeStatusAccount(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['users', 'all'] })

      toast.success(data.data)
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
