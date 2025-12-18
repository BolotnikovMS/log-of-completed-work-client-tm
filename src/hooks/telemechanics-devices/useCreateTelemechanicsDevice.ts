import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { TelemechanicDeviceService } from '../../services/telemechanic-device/telemechanic-device'
import { TTelemechanicsDevice } from '../../types'

export const useCreateTelemechanicsDevice = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: TTelemechanicsDevice) => TelemechanicDeviceService.create(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['telemechanicsDevices'] })
			await queryClient.invalidateQueries({ queryKey: ['telemechanicsDeviceInfo'] })
			await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })
			await queryClient.invalidateQueries({ queryKey: ['substations'] })
			await queryClient.invalidateQueries({ queryKey: ['district-substations'] })

			toast.success('Запись успешно добавлена!')
		},
		onError: (error) => {
			toast.error(errorHandler(error))
		}
	})
}
