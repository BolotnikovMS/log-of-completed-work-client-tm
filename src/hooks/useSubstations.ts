import { SubstationService } from '../services/substations/substation.service'
import { useQuery } from '@tanstack/react-query'

export const useSubstations = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['substations'],
    queryFn: () => SubstationService.getSubstations(),
    staleTime: 1000 * 10,
  })
  const total = data?.meta.total
  const substations = data?.data

  return { substations, total, error, isError, isLoading }
}