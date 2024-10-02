import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelCategoryService } from '../../services/channel-category/channel-category.service'

export const useDeleteChannelCategory = () => {
  const queryClient = useQueryClient()
  const deleteChannelCategory = useMutation({
    mutationFn: (id: number) => ChannelCategoryService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelCategories'] })
      toast.success('Запись успешно удалена!')
    },
    onError: (error) => {
      toast.error(errorHandler(error))
    }
  })

  return { deleteChannelCategory }
}
