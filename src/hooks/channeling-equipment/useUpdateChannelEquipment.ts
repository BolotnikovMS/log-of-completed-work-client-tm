import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelEquipmentService } from '../../services/channel-equipment/channel-equipment.service'
import { TChannelEquipmentData } from '../../types/channelingEquipment.types'

export const useUpdateChannelEquipment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TChannelEquipmentData }) => ChannelEquipmentService.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelingEquipment'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
