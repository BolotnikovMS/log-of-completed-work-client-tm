import { useQuery } from '@tanstack/react-query'
import { DistrictService } from '../../services/district/district.service'

interface IPropsDistrictSubstation {
	id: string | undefined
	search?: string
}

export const useDistrictSubstations = ({ id, search }: IPropsDistrictSubstation) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['district-substations', id, search],
    queryFn: () => DistrictService.getSubstationsRelatedDistrict(id || '', { search }),
    staleTime: 1000 * 10,
    enabled: !!id,
  })
	const substations = data?.data

  return { substations, error, isError, isLoading }
}