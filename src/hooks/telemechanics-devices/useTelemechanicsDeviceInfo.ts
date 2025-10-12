import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ITelemechanicsDeviceInfo } from '../../interfaces'
import { TelemechanicDeviceService } from '../../services/telemechanic-device/telemechanic-device'

export const useTelemechanicsDeviceInfo = (id: number, options: Omit<UseQueryOptions<ITelemechanicsDeviceInfo, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['telemechanicsDeviceInfo', id],
		queryFn: () => TelemechanicDeviceService.getDeviceInfoById(id),
		staleTime: 5 * 60 * 1000,
		...options
	})
}
