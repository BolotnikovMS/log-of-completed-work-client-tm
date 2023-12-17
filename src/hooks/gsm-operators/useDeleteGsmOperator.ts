import { useMutation, useQueryClient } from '@tanstack/react-query'

import { GsmOperatorService } from '../../services/gsm-operator/gsm-operator.service'

export const useDeleteGsmOperator = () => {
  const queryClient = useQueryClient()
  const deleteGsmOperator = useMutation({
    mutationFn: (id: number) => GsmOperatorService.deleteGsmOperator(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['gsmOperators']})
    }
  })

  return { deleteGsmOperator }
}
