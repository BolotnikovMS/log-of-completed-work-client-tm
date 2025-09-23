import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { FileService } from '../../services/file/file.service'
import { TFileUpdName } from '../../types'

export const useUpdateFileName = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: number, data: TFileUpdName }) => FileService.updateNameFile(id, data),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })

			toast.success(data.data.message)
		},
		onError: (errors) => {
			toast.error(errorHandler(errors))
		}
	})
}
