import { GsmOperatorService } from '../../services/gsm-operator/gsm-operator.service'
import { useQuery } from '@tanstack/react-query'

export const useGsmOperators = () => {
  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['gsmOperators', 'all'],
    queryFn: () => GsmOperatorService.getGsmOperators(),
    staleTime: 1000 * 10,
  })

  return { data, error, isError, isLoading, isFetching }
}
