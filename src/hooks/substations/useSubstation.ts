import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ISubstation } from '../../interfaces'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstation = (id: number, options?: Omit<UseQueryOptions<ISubstation, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['substation', id],
		queryFn: () => SubstationService.getSubstationById(id),
		staleTime: 4 * 60 * 1000,
		placeholderData: keepPreviousData,
		...options
	})
}
