import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'

export const useDeleteCompletedWork = () => {
	const queryClient = useQueryClient()
	const deleteCompletedWork = useMutation({
	mutationFn: (id: number) => CompletedWorkService.delete(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: ['completedWork']})
			toast.success('Запись успешно удалена!')
		},
		onError: (error) => {
			toast.error(`Произошла ошибка: '${error.message}'`)
		}
	})

	return { deleteCompletedWork }
}
