import { useMutation, useQueryClient } from '@tanstack/react-query'
import { errorHandler } from '../../helpers'
import { DistrictService } from '../../services/district/district.service'
import { TDistrictData } from '../../types'

export const useCreateDistrict = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TDistrictData) => DistrictService.create(data),
    onSuccess: async () => {
      const { toast } = await import('react-toastify')

      await queryClient.invalidateQueries({ queryKey: ['districts'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: async (errors) => {
      const { toast } = await import('react-toastify')

      toast.error(errorHandler(errors))
    }
  })
}
