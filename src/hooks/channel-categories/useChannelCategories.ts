import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { ChannelCategoryService } from '../../services/channel-category/channel-category.service'

export const useChannelCategories = ({ page, limit }: IQueryParams) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['channelCategories', 'all', page, limit],
    queryFn: () => ChannelCategoryService.getChannelCategories({ page, limit }),
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData,
  })

  return { data, error, isError, isLoading }
}
