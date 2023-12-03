import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DistrictService } from '../../services/district/district.service'

export const useDeleteDistrict = () => {
  const queryClient = useQueryClient()
  const deleteDistrict = useMutation({
    mutationFn: (id: number) => DistrictService.deleteDistrict(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['districts']})
    }
  })

  return { deleteDistrict }
}