import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { errorHandler } from "../../helpers"
import { IUserRole } from "../../interfaces"
import { UserService } from "../../services/user/user.service"

export const useChangeRole = (userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IUserRole) => UserService.changeUserRole(userId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users", "all"] })

      toast.success(data.data)
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
