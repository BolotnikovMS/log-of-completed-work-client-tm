import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { DistrictService } from '../../services/district/district.service'

export const useInfiniteDistricts = ({ limit = 15, sort, order }: IQueryParams) => {
  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['districts', 'infinity', sort, order,],
    queryFn: ({ pageParam = 1 }) => DistrictService.getDistricts({ page: pageParam, limit, sort, order }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    },
    select: (data) => data.pages.flatMap(page => page.data),
    placeholderData: keepPreviousData
  })

  return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
