import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ChannelCategoryService } from '../../services/channel-category/channel-category.service'
import { TChannelCategoryData } from '../../services/channel-category/channel-category.type'
import { errorHandler } from '../../helpers'

export const useCreateChannelCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TChannelCategoryData) => ChannelCategoryService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelCategories'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
