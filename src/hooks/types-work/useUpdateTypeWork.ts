import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { TypeWorkService } from '../../services/type-work/type-work.service'
import { TTypeWorkData } from '../../types/typeWork.types'

export const useUpdateTypeWork = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TTypeWorkData }) => TypeWorkService.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['typesWork'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
