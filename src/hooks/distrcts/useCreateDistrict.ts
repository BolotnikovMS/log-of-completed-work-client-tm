import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { DistrictService } from '../../services/district/district.service'
import { TDistrictData } from '../../types'

export const useCreateDistrict = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TDistrictData) => DistrictService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['districts', 'infinity'] })

      toast.success('Запись успешно добавлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
