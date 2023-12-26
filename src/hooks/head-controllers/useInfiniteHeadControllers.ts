import { HeadControllerService } from '../../services/head-controller/head-controller.service'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInfiniteHeadControllers = ({ limit }: { limit: number }) => {
  const { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['headControllers', 'infinity'],
    queryFn: ({ pageParam = 1 }) => HeadControllerService.getHeadControllers({page: pageParam, limit}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit)
      
      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    }
  })

  return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
