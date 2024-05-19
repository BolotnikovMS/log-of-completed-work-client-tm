import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { FileService } from '../../services/file/file.service'

export const useDeleteFile = () => {
  const queryClient = useQueryClient()
	const deleteFile = useMutation({
		mutationFn: (id: number) => FileService.delete(id),
		onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['substation']})
			toast.success('Файл успешно удален!')
    },
		onError: async (error) => {
			toast.error(errorHandler(error))
		}
	})

	return { deleteFile }
}
