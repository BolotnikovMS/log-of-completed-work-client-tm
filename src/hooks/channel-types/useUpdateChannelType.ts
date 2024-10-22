import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelTypeService } from '../../services/channel-type/channel-type.service'
import { TChannelTypeData } from '../../types'

export const useUpdateChannelType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TChannelTypeData }) => ChannelTypeService.updateChannelType(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelTypes'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
