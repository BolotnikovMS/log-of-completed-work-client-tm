import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IDistrict } from '../../interfaces'
import { DistrictService } from '../../services/district/district.service'

export const useDistrict = (id: number, options?: Omit<UseQueryOptions<IDistrict, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['district', id],
		queryFn: () => DistrictService.getDistrictById(id),
		staleTime: 4 * 60 * 1000,
		placeholderData: keepPreviousData,
		...options
	})
}
