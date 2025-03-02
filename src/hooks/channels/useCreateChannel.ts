import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelService } from '../../services/channel/channel.service'
import { TChannelData } from '../../types'

export const useCreateChannel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TChannelData) => ChannelService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channels'] })
      await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
