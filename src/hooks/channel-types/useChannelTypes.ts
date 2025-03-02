import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { ChannelTypeService } from '../../services/channel-type/channel-type.service'

export const useChannelTypes = ({ page, limit }: IQueryParams) => {
  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['channelTypes', 'all', page, limit],
    queryFn: () => ChannelTypeService.getChannelTypes({ page, limit }),
    staleTime: 7 * 60 * 1000,
    placeholderData: keepPreviousData,
  })

  return { data, error, isError, isLoading, isFetching }
}
