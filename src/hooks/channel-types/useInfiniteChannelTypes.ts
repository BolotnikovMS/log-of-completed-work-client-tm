import { useInfiniteQuery } from '@tanstack/react-query'
import { ChannelTypeService } from '../../services/channel-type/channel-type.service'


export const useInfiniteChannelTypes = ({ limit }: { limit: number }) => {
  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['channelTypes'],
    queryFn: ({ pageParam = 1}) => ChannelTypeService.getChannelTypes({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    }
  })

  return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
