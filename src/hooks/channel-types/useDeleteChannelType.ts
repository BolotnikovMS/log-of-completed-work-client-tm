import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChannelTypeService } from '../../services/channel-type/channel-type.service'

export const useDeleteChannelType = () => {
  const queryClient = useQueryClient()
  const deleteChannelType = useMutation({
    mutationFn: (id: number) => ChannelTypeService.deleteChannelType(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['channelTypes']})
    }
  })

  return { deleteChannelType }
}
