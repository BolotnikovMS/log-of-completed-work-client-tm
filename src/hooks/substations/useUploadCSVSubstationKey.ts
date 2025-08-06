import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { FileService } from '../../services/file/file.service'

export const useUploadCSVSubstationKey = () => {
	return useMutation({
		mutationFn: (file: File) => FileService.uploadCSVSubstationKey(file),
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (errors) => {
			toast.error(errorHandler(errors))
		}
	})
}
