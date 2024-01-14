import { useQuery } from '@tanstack/react-query'
import { DistrictService } from '../../services/district/district.service'

export const useDistrictSubstations = (id: string | undefined) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['district-substations', id],
    queryFn: () => DistrictService.getSubstationsRelatedDistrict(id || ''),
    staleTime: 1000 * 10,
    enabled: !!id,
  })
	const substations = data?.data

  return { substations, error, isError, isLoading }
}