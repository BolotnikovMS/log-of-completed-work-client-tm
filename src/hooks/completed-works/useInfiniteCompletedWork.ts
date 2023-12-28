import { useInfiniteQuery } from '@tanstack/react-query'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'

export const useInfiniteCompletedWork = ({ limit }: { limit: number }) => {
	const {
		data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['completedWork', 'infinity'],
		queryFn: ({ pageParam = 1 }) => CompletedWorkService.getAll({page: pageParam, limit}),
		initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    }
	})
	
	return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
