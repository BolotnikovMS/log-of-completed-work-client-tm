import { useMutation, useQueryClient } from '@tanstack/react-query'

import { VoltageClassService } from '../../services/voltage-class/voltage-class.service'

export const useDeleteVoltageClass = () => {
  const queryClient = useQueryClient()
  const deleteVoltageClass = useMutation({
    mutationFn: (id: number) => VoltageClassService.deleteVoltageClass(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['voltageClasses']})
    }
  })
  
  return { deleteVoltageClass }
}