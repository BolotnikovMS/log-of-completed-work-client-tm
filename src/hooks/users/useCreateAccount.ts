import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { UserService } from '../../services/user/user.service'
import { TUserData } from '../../types'

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TUserData) => UserService.createUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })

      toast.success('УЗ пользователя успешно создана!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
