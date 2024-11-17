import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { VoltageClassService } from '../../services/voltage-class/voltage-class.service'
import { TVoltageClassData } from '../../types'

export const useUpdateVoltageClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TVoltageClassData }) => VoltageClassService.updateVoltageClass(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['voltageClasses'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
