import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { DistrictService } from '../../services/district/district.service'

export const useDistricts = ({ page, limit, sort, order }: IQueryParams) => {
  const { data: districts, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['districts', 'all', page, limit, sort, order],
    queryFn: () => DistrictService.getDistricts({ page, limit, sort, order }),
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData,
  })

  return { districts, error, isError, isLoading, isFetching }
}
