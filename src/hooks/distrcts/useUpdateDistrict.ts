import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { IDistrict } from '../../interfaces'
import { DistrictService } from '../../services/district/district.service'

export const useUpdateDistrict = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: IDistrict }) => DistrictService.updateDistrict(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['districts', 'infinity'] })
      await queryClient.invalidateQueries({ queryKey: ['districts'] })
      await queryClient.invalidateQueries({ queryKey: ['district'] })

      toast.success('Запись успешно обновлена!')
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
}
