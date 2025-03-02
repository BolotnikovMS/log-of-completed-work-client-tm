import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { TypeKpService } from '../../services/types-kp/type-kp.service'

export const useTypesKp = ({ page, limit }: IQueryParams) => {
  const { data: typesKp, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['typesKp', 'all', page, limit],
    queryFn: () => TypeKpService.getTypesKp({ page, limit }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  })

  return { typesKp, error, isError, isLoading, isFetching }
}
