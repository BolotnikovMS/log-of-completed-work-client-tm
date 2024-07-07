import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { DistrictService } from '../../services/district/district.service'

interface IPropsDistrictSubstation extends IQueryParams {
	id: string | undefined
}

export const useDistrictSubstations = ({ id, search, sort, order }: IPropsDistrictSubstation ) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['district-substations', id, search, sort, order],
    queryFn: () => DistrictService.getSubstationsRelatedDistrict(id || '', { search, sort, order }),
    staleTime: 1000 * 10,
    enabled: !!id,
  })
	const substations = data?.data

  return { substations, error, isError, isLoading }
}