import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers/errorHandler.helper'
import { VoltageClassService } from '../../services/voltage-class/voltage-class.service'

export const useDeleteVoltageClass = () => {
  const queryClient = useQueryClient()
  const deleteVoltageClass = useMutation({
    mutationFn: (id: number) => VoltageClassService.deleteVoltageClass(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['voltageClasses', 'infinity']})
			toast.success('Запись успешно удалена!')
    },
		onError: (error) => {
			toast.error(errorHandler(error))
		}
  })
  
  return { deleteVoltageClass }
}