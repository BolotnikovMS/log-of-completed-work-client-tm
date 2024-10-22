import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { DistrictService } from '../../services/district/district.service'

export const useDistricts = ({ page, limit }: IQueryParams) => {
  const { data: districts, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['districts', 'all'],
    queryFn: () => DistrictService.getDistricts({page, limit}),
    staleTime: 1000 * 10,
  })

  return { districts, error, isError, isLoading, isFetching }
}
