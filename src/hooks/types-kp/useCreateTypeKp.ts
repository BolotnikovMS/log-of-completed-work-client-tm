import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { TypeKpService } from '../../services/types-kp/type-kp.service'
import { TTypeKpData } from '../../types'

export const useCreateTypeKp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TTypeKpData) => TypeKpService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['typesKp'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
