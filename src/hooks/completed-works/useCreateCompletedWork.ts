import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CompletedWorkService } from "../../services/completed-work/completed-work.service"
import { TCompletedWorkData } from "../../services/completed-work/completed-work.type"
import { toast } from "react-toastify"
import { errorHandler } from "../../helpers"

export const useCreateCompletedWork = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TCompletedWorkData) => CompletedWorkService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['completedWork', 'infinity']})

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
