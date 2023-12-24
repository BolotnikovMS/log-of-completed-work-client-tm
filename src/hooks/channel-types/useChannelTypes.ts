import { ChannelTypeService } from '../../services/channel-type/channel-type.service'
import { useQuery } from '@tanstack/react-query'

export const useChannelTypes = () => {
  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['channelTypes'],
    queryFn: () => ChannelTypeService.getChannelTypes({}),
    staleTime: 1000 * 10,
  })

  return { data, error, isError, isLoading, isFetching }
}
