import { useQuery } from '@tanstack/react-query'
import { TypeWorkService } from '../../services/type-work/type-work.service'

export const useTypesWork = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['typesWork', 'all'],
    queryFn: () => TypeWorkService.getTypesWork({}),
    staleTime: 1000 * 10,
  })

  return { data, error, isError, isLoading }
}