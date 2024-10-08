import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelEquipmentService } from '../../services/channel-equipment/channel-equipment.service'
import { TChannelEquipmentData } from '../../types'

export const useCreateChannelEquipment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TChannelEquipmentData) => ChannelEquipmentService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelingEquipment'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
