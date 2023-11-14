import { DistrictService } from '../services/district/district.service'
import { useQuery } from '@tanstack/react-query'

export const useDistrictSubstations = (id: string | undefined) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['district-substations', id],
    queryFn: () => DistrictService.getSubstationsRelatedDistrict(id || ''),
    staleTime: 1000 * 10,
    enabled: !!id,
  })

  return { data, error, isError, isLoading }
}