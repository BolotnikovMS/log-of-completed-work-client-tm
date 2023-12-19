import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SubstationService } from '../../services/substations/substation.service'

export const useDeleteSubstation = () => {
  const queryClient = useQueryClient()
  const deleteSubstation = useMutation({
    mutationFn: (id: number) => SubstationService.deleteSubstation(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['substations']})
    }
  })

  return { deleteSubstation }
}
