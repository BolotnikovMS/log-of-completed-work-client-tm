import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DistrictService } from '../../services/district/district.service'
import { errorHandler } from '../../helpers/errorHandler.helper'
import { toast } from 'react-toastify'

export const useDeleteDistrict = () => {
  const queryClient = useQueryClient()
  const deleteDistrict = useMutation({
    mutationFn: (id: number) => DistrictService.deleteDistrict(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['districts']})
			toast.success('Запись успешно удалена!')
    },
		onError: async (error) => {
			toast.error(errorHandler(error))
		}
  })

  return { deleteDistrict }
}