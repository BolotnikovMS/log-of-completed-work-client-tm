import { useInfiniteQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { ChannelEquipmentService } from '../../services/channel-equipment/channel-equipment.service'

export const useInfiniteChannelingEquipment = ({ limit = 15 }: IQueryParams) => {
  const { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['channelingEquipment', 'infinity'],
    queryFn: ({ pageParam = 1 }) => ChannelEquipmentService.getChannelingEquipment({ page: pageParam, limit }),
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
