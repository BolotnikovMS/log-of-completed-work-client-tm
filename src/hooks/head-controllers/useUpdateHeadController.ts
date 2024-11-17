import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { HeadControllerService } from '../../services/head-controller/head-controller.service'
import { THeadControllerData } from '../../types'

export const useUpdateHeadController = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: THeadControllerData }) => HeadControllerService.updateHeadController(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['headControllers'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
