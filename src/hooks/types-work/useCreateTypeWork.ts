import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { TypeWorkService } from '../../services/type-work/type-work.service'
import { TTypeWorkData } from '../../types/typeWork.types'

export const useCreateTypeWork = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TTypeWorkData) => TypeWorkService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['typesWork'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
