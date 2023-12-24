import { VoltageClassService } from '../../services/voltage-class/voltage-class.service'
import { useQuery } from '@tanstack/react-query'

export const useVoltageClasses = () => {
  const { data: voltageClasses, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['voltageClasses', 'all'],
    queryFn: () => VoltageClassService.getVoltageClasses({}),
    staleTime: 1000 * 10,
  })

  return { voltageClasses, error, isError, isLoading, isFetching }
}