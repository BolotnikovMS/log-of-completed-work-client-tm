import { useInfiniteQuery } from '@tanstack/react-query'
import { TypeKpService } from '../../services/types-kp/type-kp.service'

export const useInfiniteTypesKp = ({ limit }: { limit: number }) => {
  const { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['typesKp', 'infinity'],
    queryFn: ({ pageParam = 1 }) => TypeKpService.getTypesKp({page: pageParam, limit}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    },
    select: (data) => data.pages
  })

  return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
