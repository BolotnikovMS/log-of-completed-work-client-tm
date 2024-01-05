import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { DistrictService } from '../../services/district/district.service'

export const useDeleteDistrict = () => {
  const queryClient = useQueryClient()
  const deleteDistrict = useMutation({
    mutationFn: (id: number) => DistrictService.deleteDistrict(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['districts']})
			toast.success('Запись успешно удалена!')
    },
		onError: (error) => {
			toast.error(`Произошла ошибка: '${error.message}'`)
		}
  })

  return { deleteDistrict }
}