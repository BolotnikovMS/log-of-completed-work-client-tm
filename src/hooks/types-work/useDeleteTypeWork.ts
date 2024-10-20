import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { TypeWorkService } from '../../services/type-work/type-work.service'

export const useDeleteTypeWork = () => {
  const queryClient = useQueryClient()
  const deleteTypeWork = useMutation({
    mutationFn: (id: number) => TypeWorkService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['typesWork'] })
      toast.success('Запись успешно удалена!')
    },
    onError: (error) => {
      toast.error(errorHandler(error))
    }
  })
  
  return { deleteTypeWork }
}
