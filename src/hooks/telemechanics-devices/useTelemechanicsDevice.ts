import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ITelemechanicsDevices } from '../../interfaces'
import { TelemechanicDeviceService } from '../../services/telemechanic-device/telemechanic-device'

export const useTelemechanicsDevice = (id: number, options?: Omit<UseQueryOptions<ITelemechanicsDevices, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['telemechanicsDevice', id],
		queryFn: () => TelemechanicDeviceService.getDeviceById(id),
		staleTime: 10000 * 10,
		placeholderData: keepPreviousData,
		...options
	})
}
