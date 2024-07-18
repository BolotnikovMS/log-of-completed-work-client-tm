import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { errorHandler } from "../../helpers"
import { GsmOperatorService } from "../../services/gsm-operator/gsm-operator.service"
import { TGsmOperatorData } from "../../services/gsm-operator/gsm-operator.type"

export const useCreateGsmOperator = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TGsmOperatorData) => GsmOperatorService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['gsmOperators'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
