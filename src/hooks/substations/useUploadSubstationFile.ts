import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { errorHandler } from "../../helpers"
import { FileService } from "../../services/file/file.service"
import { TNewFileUpload } from "../../services/file/file.type"

export const useUploadSubstationFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TNewFileUpload) => FileService.upload(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['substation'] })

      toast.success('Файл успешно загружен!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
