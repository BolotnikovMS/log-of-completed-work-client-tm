import { useInfiniteQuery } from '@tanstack/react-query'
import { SubstationService } from '../../services/substations/substation.service'

export const useInfiniteSubstations = ({ limit, search }: { limit: number, search?: string }) => {
  const { 
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    } = useInfiniteQuery({
    queryKey: ['substations', 'infinity', search],
    queryFn: ({ pageParam = 1 }) => SubstationService.getSubstations({page: pageParam, limit, search}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    }
  })

  return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
