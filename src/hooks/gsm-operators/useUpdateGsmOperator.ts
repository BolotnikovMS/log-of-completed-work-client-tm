import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { GsmOperatorService } from '../../services/gsm-operator/gsm-operator.service'
import { TGsmOperatorData } from '../../types'

export const useUpdateGsmOperator = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TGsmOperatorData }) => GsmOperatorService.updateGsmOperator(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['gsmOperators'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
