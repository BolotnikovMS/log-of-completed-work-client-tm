import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ChannelCategoryService } from '../../services/channel-category/channel-category.service'
import { errorHandler } from '../../helpers'
import { TChannelCategoryData } from '../../types'

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
