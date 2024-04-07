import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers/errorHandler.helper'
import { GsmOperatorService } from '../../services/gsm-operator/gsm-operator.service'

export const useDeleteGsmOperator = () => {
  const queryClient = useQueryClient()
  const deleteGsmOperator = useMutation({
    mutationFn: (id: number) => GsmOperatorService.deleteGsmOperator(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['gsmOperators']})
			toast.success('Запись успешно удалена!')
    },
		onError: (error) => {
			toast.error(errorHandler(error))
		}
  })

  return { deleteGsmOperator }
}
