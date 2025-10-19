import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { TelemechanicDeviceService } from '../../services/telemechanic-device/telemechanic-device'

export const useDeleteTelemechanicsDevice = () => {
	const queryClient = useQueryClient()
	const deleteTelemechanicsDevice = useMutation({
		mutationFn: (id: number) => TelemechanicDeviceService.delete(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['telemechanicsDevices'] })
			await queryClient.invalidateQueries({ queryKey: ['telemechanicsDevice'] })
			await queryClient.invalidateQueries({ queryKey: ['telemechanicsDeviceInfo'] })
			await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })
			await queryClient.invalidateQueries({ queryKey: ['substations'] })

			toast.success('Запись успешно удалена!')
		},
		onError: (error) => {
			toast.error(errorHandler(error))
		}
	})

	return { deleteTelemechanicsDevice }
}
