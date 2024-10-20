import { useInfiniteQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'

export const useInfiniteCompletedWork = ({ limit, substation, executor, dateStart, dateEnd, typeWork }: IQueryParams) => {
  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['completedWork', 'infinity', substation, executor, dateStart, dateEnd, typeWork],
    queryFn: ({ pageParam = 1 }) => CompletedWorkService.getAll({ page: pageParam, limit, substation, executor, dateStart, dateEnd, typeWork }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit!)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    }
  })

  return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
