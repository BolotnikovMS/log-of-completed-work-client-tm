import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelService } from '../../services/channel/channel.service'

export const useDeleteChannel = () => {
  const queryClient = useQueryClient()
  const deleteChannel = useMutation({
    mutationFn: (id: number) => ChannelService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channels'] })
      await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })
      toast.success('Запись успешно удалена!')
    },
    onError: (error) => {
      toast.error(errorHandler(error))
    }
  })

  return { deleteChannel }
}
