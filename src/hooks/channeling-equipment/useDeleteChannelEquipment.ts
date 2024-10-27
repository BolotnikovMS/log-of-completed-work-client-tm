import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelEquipmentService } from '../../services/channel-equipment/channel-equipment.service'

export const useDeleteChannelEquipment = () => {
  const queryClient = useQueryClient()
  const deleteChannelEquipment = useMutation({
    mutationFn: (id: number) => ChannelEquipmentService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['channelingEquipment'] })
      toast.success('Запись успешно удалена!')
    },
    onError: (error) => {
      toast.error(errorHandler(error))
    }
  })

  return { deleteChannelEquipment }
}
