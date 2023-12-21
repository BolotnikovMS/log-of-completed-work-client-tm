import { DistrictService } from '../../services/district/district.service'
import { useQuery } from '@tanstack/react-query'

interface IUseDistricts {
  page?: number
  limit?: number
}

export const useDistricts = ({ page, limit }: IUseDistricts) => {
  const { data: districts, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['districts'],
    queryFn: () => DistrictService.getDistricts({page, limit}),
    staleTime: 1000 * 10,
  })
  
  return { districts, error, isError, isLoading, isFetching }
}