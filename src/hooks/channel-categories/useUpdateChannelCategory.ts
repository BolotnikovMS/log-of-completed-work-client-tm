import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelCategoryService } from '../../services/channel-category/channel-category.service'
import { TChannelCategoryData } from '../../types'

export const useUpdateChannelCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TChannelCategoryData }) => ChannelCategoryService.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelCategories'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
