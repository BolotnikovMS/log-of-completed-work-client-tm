import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { errorHandler } from "../../helpers"
import { VoltageClassService } from "../../services/voltage-class/voltage-class.service"
import { TVoltageClass } from "../../services/voltage-class/voltage-class.type"

export const useCreateVoltageClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TVoltageClass) => VoltageClassService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['voltageClasses', 'infinity'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}