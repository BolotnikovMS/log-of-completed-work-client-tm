import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers/errorHandler.helper'
import { ChannelTypeService } from '../../services/channel-type/channel-type.service'

export const useDeleteChannelType = () => {
  const queryClient = useQueryClient()
  const deleteChannelType = useMutation({
    mutationFn: (id: number) => ChannelTypeService.deleteChannelType(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelTypes'] })
      toast.success('Запись успешно удалена!')
    },
    onError: (error) => {
      toast.error(errorHandler(error))
    }
  })

  return { deleteChannelType }
}
