import { useInfiniteQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { SubstationService } from '../../services/substations/substation.service'

export const useInfiniteSubstations = ({ limit = 15, search, sort, order, typeKp, headController }: IQueryParams) => {
  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['substations', 'infinity', search, sort, order, typeKp, headController],
    queryFn: ({ pageParam = 1 }) => SubstationService.getSubstations({ page: pageParam, limit, search, sort, order, typeKp, headController }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    }
  })

  return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
