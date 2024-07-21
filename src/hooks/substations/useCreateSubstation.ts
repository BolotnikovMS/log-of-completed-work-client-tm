import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { errorHandler } from "../../helpers"
import { SubstationService } from "../../services/substations/substation.service"
import { TSubstationData } from "../../services/substations/substation.type"

export const useCreateSubstation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TSubstationData) => SubstationService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['substation'] })
      await queryClient.invalidateQueries({ queryKey: ['substations'] })
      await queryClient.invalidateQueries({ queryKey: ['district-substations'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
