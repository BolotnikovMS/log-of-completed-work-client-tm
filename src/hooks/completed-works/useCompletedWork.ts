import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { ICompletedWork } from '../../interfaces'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'

export const useCompletedWork = (id: number, options?: Omit<UseQueryOptions<ICompletedWork, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['completedWork', id],
		queryFn: () => CompletedWorkService.getCompletedWorkById(id),
		staleTime: 4 * 60 * 1000,
		...options
	})
}
