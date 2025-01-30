import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ObjectTypeService } from '../../services/object-types/object-types.service'
import { TObjectTypeData } from '../../types'

export const useCreateObjectType = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: TObjectTypeData) => ObjectTypeService.create(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['objectTypes'] })

			toast.success('Запись успешно добавлена!')
		},
		onError: (errors) => {
      toast.error(errorHandler(errors))
    }
	})
}
