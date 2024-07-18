import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelTypeService } from '../../services/channel-type/channel-type.service'
import { TChannelTypeData } from '../../services/channel-type/channel-type.type'

export const useCreateChannelType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TChannelTypeData) => ChannelTypeService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelTypes'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
