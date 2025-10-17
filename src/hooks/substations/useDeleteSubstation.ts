import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers/errorHandler.helper'
import { SubstationService } from '../../services/substations/substation.service'

export const useDeleteSubstation = () => {
	const queryClient = useQueryClient()
	const deleteSubstation = useMutation({
		mutationFn: (id: number) => SubstationService.deleteSubstation(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['substations'] })
			await queryClient.invalidateQueries({ queryKey: ['district-substations'] })
			await queryClient.invalidateQueries({ queryKey: ['substationsSelect'] })

			toast.success('Запись успешно удалена!')
		},
		onError: async (error) => {
			toast.error(errorHandler(error))
		}
	})

	return { deleteSubstation }
}
