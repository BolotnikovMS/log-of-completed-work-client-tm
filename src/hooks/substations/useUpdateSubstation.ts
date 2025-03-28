import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { SubstationService } from '../../services/substations/substation.service'
import { TSubstationData } from '../../types'

export const useUpdateSubstation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TSubstationData }) => SubstationService.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['substation'] })
      await queryClient.invalidateQueries({ queryKey: ['substations'] })
      await queryClient.invalidateQueries({ queryKey: ['substationInfo'] })
      await queryClient.invalidateQueries({ queryKey: ['district-substations'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
