import { DistrictService } from '../services/district/district.service'
import { useQuery } from '@tanstack/react-query'

export const useDistrict = () => {
  const { data: districts, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['districts'],
    queryFn: () => DistrictService.getDistricts(),
    staleTime: 1000 * 10,
  })
  
  return { districts, error, isError, isLoading, isFetching }
}