import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { DistrictService } from '../../services/district/district.service'

interface IPropsDistrictSubstation extends IQueryParams {
	id: string | undefined
}

export const useDistrictSubstations = ({ id, search, sort, order }: IPropsDistrictSubstation) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['district-substations', id, search, sort, order],
		queryFn: () => DistrictService.getSubstationsRelatedDistrict(id || '', { search, sort, order }),
		staleTime: 1 * 60 * 1000,
		enabled: !!id,
	})

	return { data, error, isError, isLoading }
}
