import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { errorHandler } from "../../helpers"
import { VoltageClassService } from "../../services/voltage-class/voltage-class.service"
import { TVoltageClass } from "../../services/voltage-class/voltage-class.type"

export const useUpdateVoltageClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: TVoltageClass }) => VoltageClassService.updateVoltageClass(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['voltageClasses', 'infinity'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
