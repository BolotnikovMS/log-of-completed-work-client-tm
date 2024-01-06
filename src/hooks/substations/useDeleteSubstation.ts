import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { SubstationService } from '../../services/substations/substation.service'

export const useDeleteSubstation = () => {
  const queryClient = useQueryClient()
  const deleteSubstation = useMutation({
    mutationFn: (id: number) => SubstationService.deleteSubstation(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['substations']})
			toast.success('Запись успешно удалена!')
    },
		onError: (error) => {
			toast.error(`Произошла ошибка: '${error.message}'`)
		}
  })

  return { deleteSubstation }
}
