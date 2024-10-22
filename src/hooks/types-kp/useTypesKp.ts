import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { TypeKpService } from '../../services/types-kp/type-kp.service'

export const useTypesKp = ({ page, limit }: IQueryParams) => {
  const { data: typesKp, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['typesKp', 'all'],
    queryFn: () => TypeKpService.getTypesKp({page, limit}),
    staleTime: 1000 * 10,
  })

  return { typesKp, error, isError, isLoading, isFetching }
}
