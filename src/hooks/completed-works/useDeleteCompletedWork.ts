import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CompletedWorkService } from '../../services/completed-work/completed-work.service'

export const useDeleteCompletedWork = () => {
  const queryClient = useQueryClient()
	const deleteCompletedWork = useMutation({
    mutationFn: (id: number) => CompletedWorkService.delete(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['completedWork']})
    }
  })

  return { deleteCompletedWork }

}
