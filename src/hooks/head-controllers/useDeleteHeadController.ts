import { useMutation, useQueryClient } from '@tanstack/react-query'

import { HeadControllerService } from '../../services/head-controller/head-controller.service'

export const useDeleteHeadController = () => {
  const queryClient = useQueryClient()
  const deleteHeadController = useMutation({
    mutationFn: (id: number) => HeadControllerService.deleteHeadController(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['headControllers']})
    }
  })
  
  return { deleteHeadController }
}
