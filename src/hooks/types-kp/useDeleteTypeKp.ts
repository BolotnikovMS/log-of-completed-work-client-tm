import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers/errorHandler.helper'
import { TypeKpService } from '../../services/types-kp/type-kp.service'

export const useDeleteTypeKp = () => {
  const queryClient = useQueryClient()
  const deleteTypeKp = useMutation({
    mutationFn: (id: number) => TypeKpService.deleteTypeKp(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['typesKp']})
			toast.success('Запись успешно удалена!')
    },
		onError: (error) => {
			toast.error(errorHandler(error))
		}
  })

  return { deleteTypeKp }
}