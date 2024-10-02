import { useQuery } from '@tanstack/react-query'
import { ChannelCategoryService } from '../../services/channel-category/channel-category.service'

export const useChannelCategories = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['channelCategories', 'all'],
    queryFn: () => ChannelCategoryService.getChannelCategories({}),
    staleTime: 1000 * 10,
  })

  return { data, error, isError, isLoading }
}
