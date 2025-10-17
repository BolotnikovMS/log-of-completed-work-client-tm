import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { SubstationService } from '../../services/substations/substation.service'
import { TSubstationKeyDefect } from '../../types/substation.types'

export const useUpdateSubstationKeyDefect = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: number, data: TSubstationKeyDefect }) => SubstationService.updKeyDefect(id, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })

			toast.success('Ключ связи успешно обновлен!')
		},
		onError: (errors) => {
			toast.error(errorHandler(errors))
		}
	})
}
