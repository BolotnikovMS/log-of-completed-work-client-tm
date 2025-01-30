import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ObjectTypeService } from '../../services/object-types/object-types.service'
import { TObjectTypeData } from '../../types'

export const useUpdateObjectType = () => {
	const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TObjectTypeData }) => ObjectTypeService.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['objectTypes'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
