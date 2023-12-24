import { TypeKpService } from '../../services/types-kp/type-kp.service'
import { useQuery } from '@tanstack/react-query'

interface IUseTypesKp {
  page?: number
  limit?: number
}

export const useTypesKp = ({ page, limit }: IUseTypesKp) => {
  const { data: typesKp, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['typesKp', 'all'],
    queryFn: () => TypeKpService.getTypesKp({page, limit}),
    staleTime: 1000 * 10,
  })
  
  return { typesKp, error, isError, isLoading, isFetching }
}