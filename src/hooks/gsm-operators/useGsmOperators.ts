import { useQuery } from '@tanstack/react-query'
import { GsmOperatorService } from '../../services/gsm-operator/gsm-operator.service'

export const useGsmOperators = () => {
  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['gsmOperators', 'all'],
    queryFn: () => GsmOperatorService.getGsmOperators(),
    staleTime: 10 * 60 * 1000,
  })

  return { data, error, isError, isLoading, isFetching }
}
