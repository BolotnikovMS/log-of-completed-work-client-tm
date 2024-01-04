import { useQuery } from '@tanstack/react-query'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstations = () => {
  const { data: substations, error, isError, isLoading } = useQuery({
    queryKey: ['substations', 'all'],
    queryFn: () => SubstationService.getSubstations({}),
    staleTime: 1000 * 10,
  })

  return { substations, error, isError, isLoading }
}