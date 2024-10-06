import { useInfiniteQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { ChannelService } from '../../services/channel/channel.service'

export const useInfiniteChannels = ({ limit = 15, substation, channelType }: IQueryParams) => {
  const { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['channels', 'infinity', substation, channelType],
    queryFn: ({ pageParam = 1 }) => ChannelService.getChannels({ page: pageParam, limit, substation, channelType }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.ceil(allPages[0].meta.total / limit)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    }
  })

  return { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }
}
