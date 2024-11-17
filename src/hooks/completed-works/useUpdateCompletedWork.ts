import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'
import { TCompletedWorkData } from '../../types'

export const useUpdateCompletedWork = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TCompletedWorkData }) => {
      return CompletedWorkService.update(id, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['completedWork'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
