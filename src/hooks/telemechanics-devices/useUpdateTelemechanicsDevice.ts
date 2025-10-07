import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { TelemechanicDeviceService } from '../../services/telemechanic-device/telemechanic-device'
import { TTelemechanicsDevice } from '../../types'

export const useUpdateTelemechanicsDevice = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({id, data}: {id: number, data: TTelemechanicsDevice}) => TelemechanicDeviceService.update(id, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['telemechanicsDevices']})
			await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })
			await queryClient.invalidateQueries({ queryKey: ['telemechanicsDevice'] })
			
			toast.success('Запись успешно обновлена!')
		},
		onError: (error) => {
			toast.error(errorHandler(error))
		}
	})
}
