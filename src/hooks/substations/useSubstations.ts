import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstations = ({page, limit}: IQueryParams) => {
  const { data: substations, error, isError, isLoading } = useQuery({
    queryKey: ['substations', 'all'],
    queryFn: () => SubstationService.getSubstations({ page, limit }),
    staleTime: 1000 * 10,
  })

  return { substations, error, isError, isLoading }
}