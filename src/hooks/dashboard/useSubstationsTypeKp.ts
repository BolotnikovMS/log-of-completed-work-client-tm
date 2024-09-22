import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '../../services/dashboard/dashboard.service'

export const useSubstationsTypeKp = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['dashboardSubstationsTypeKp'],
    queryFn: () => DashboardService.getSubstationsTypeKp(),
    staleTime: 1000 * 10,
  })

  return { data, error, isError, isLoading }
}
