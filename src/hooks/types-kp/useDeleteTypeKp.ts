import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeKpService } from '../../services/types-kp/type-kp.service'

export const useDeleteTypeKp = () => {
  const queryClient = useQueryClient()
  const deleteTypeKp = useMutation({
    mutationFn: (id: number) => TypeKpService.deleteTypeKp(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['typesKp']})
    }
  })

  return { deleteTypeKp }
}