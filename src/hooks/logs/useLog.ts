import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Ilog } from '../../interfaces'
import { LogService } from '../../services/log/log.service'

export const useLog = (id: number, options?: Omit<UseQueryOptions<Ilog, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['log', id],
		queryFn: () => LogService.getLogById(id),
		staleTime: 8 * 60 * 1000,
		placeholderData: keepPreviousData,
		...options
	})
}
