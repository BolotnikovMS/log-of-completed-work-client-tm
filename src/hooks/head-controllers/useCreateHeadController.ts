import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { HeadControllerService } from '../../services/head-controller/head-controller.service'
import { THeadControllerData } from '../../types'

export const useCreateHeadController = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: THeadControllerData) => HeadControllerService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['headControllers', 'infinity'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
