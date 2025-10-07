import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { TelemechanicDeviceService } from '../../services/telemechanic-device/telemechanic-device'

export const useTelemechanicsDevices = ({ page, limit }: IQueryParams) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['telemechanicsDevices', page, limit],
		queryFn: () => TelemechanicDeviceService.getAllDevices({ page, limit }),
		staleTime: 1000 * 10,
		placeholderData: keepPreviousData
	})

	return { data, error, isError, isLoading }
}
