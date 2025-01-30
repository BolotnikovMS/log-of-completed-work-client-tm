import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ObjectTypeService } from '../../services/object-types/object-types.service'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'

export const useDeleteObjectType = () => {
	const queryClient = useQueryClient()
	const deleteObjectType = useMutation({
    mutationFn: (id: number) => ObjectTypeService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['objectTypes'] })
      toast.success('Запись успешно удалена!')
    },
    onError: (error) => {
      toast.error(errorHandler(error))
    }
  })

  return { deleteObjectType }
}
