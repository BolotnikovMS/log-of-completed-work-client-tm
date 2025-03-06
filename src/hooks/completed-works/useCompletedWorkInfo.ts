import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ICompletedWorkInfo } from '../../interfaces'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'

export const useCompletedWorkInfo = (id: number, options?: Omit<UseQueryOptions<ICompletedWorkInfo, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['completedWorkInfo', id],
		queryFn: () => CompletedWorkService.getCompletedWorkInfo(id),
		staleTime: 4 * 60 * 1000,
		...options
	})
}
