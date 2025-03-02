import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { VoltageClassService } from '../../services/voltage-class/voltage-class.service'

export const useVoltageClasses = ({ page, limit }: IQueryParams) => {
  const { data: voltageClasses, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['voltageClasses', 'all', page, limit],
    queryFn: () => VoltageClassService.getVoltageClasses({ page, limit }),
    staleTime: 7 * 60 * 1000,
    placeholderData: keepPreviousData,
  })

  return { voltageClasses, error, isError, isLoading, isFetching }
}
