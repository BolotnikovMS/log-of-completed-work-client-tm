import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers/errorHandler.helper'
import { HeadControllerService } from '../../services/head-controller/head-controller.service'

export const useDeleteHeadController = () => {
  const queryClient = useQueryClient()
  const deleteHeadController = useMutation({
    mutationFn: (id: number) => HeadControllerService.deleteHeadController(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['headControllers'] })
      toast.success('Запись успешно удалена!')
    },
    onError: (error) => {
      toast.error(errorHandler(error))
    }
  })

  return { deleteHeadController }
}
