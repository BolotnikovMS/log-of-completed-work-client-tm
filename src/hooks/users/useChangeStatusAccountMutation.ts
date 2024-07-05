import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UserService } from "../../services/user/user.service"
import { toast } from "react-toastify"
import { errorHandler } from "../../helpers"
import { IStatusAccount } from "../../interfaces"

export const useChangeStatusAccountMutation = (userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IStatusAccount) => UserService.changeStatusAccount(userId, data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["users", "all"] })

      toast.success(data.data)
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
