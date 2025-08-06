import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { FileService } from '../../services/file/file.service'
import { TFileUploadData } from '../../types'

export const useUploadSubstationFile = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: TFileUploadData) => FileService.upload(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })

			toast.success('Файл успешно загружен!')
		},
		onError: (errors) => {
			toast.error(errorHandler(errors))
		}
	})
}
