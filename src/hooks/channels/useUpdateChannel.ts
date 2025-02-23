import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelService } from '../../services/channel/channel.service'
import { TChannelData } from '../../types'

export const useUpdateChannel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TChannelData }) => ChannelService.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channels'] })
      await queryClient.invalidateQueries({ queryKey: ['substation'] })
      await queryClient.invalidateQueries({ queryKey: ['channel'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
