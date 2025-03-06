import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'
import { TCompletedWorkData } from '../../types'

export const useCreateCompletedWork = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TCompletedWorkData) => CompletedWorkService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['completedWorks'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
