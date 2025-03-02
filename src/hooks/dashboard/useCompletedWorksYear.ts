import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '../../services/dashboard/dashboard.service'

export const useCompletedWorksYear = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['dashboardCompletedWorksYear'],
    queryFn: () => DashboardService.getCompletedWorksYear(),
    staleTime: 1 * 60 * 1000,
  })

  return { data, error, isError, isLoading }
}
