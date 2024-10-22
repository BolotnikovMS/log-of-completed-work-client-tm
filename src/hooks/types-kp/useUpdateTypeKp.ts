import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { TypeKpService } from '../../services/types-kp/type-kp.service'
import { TTypeKpData } from '../../types'

export const useUpdateTypeKp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TTypeKpData }) => TypeKpService.updateTypeKp(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['typesKp', 'infinity'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
