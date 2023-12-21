import { HeadControllerService } from '../../services/head-controller/head-controller.service'
import { useQuery } from '@tanstack/react-query'

export const useHeadControllers = () => {
  const { data: headControllers, error, isError, isLoading } = useQuery({
    queryKey: ['headControllers'],
    queryFn: () => HeadControllerService.getHeadControllers({}),
    staleTime: 1000 * 10,
  })

  return { headControllers, error, isError, isLoading }
}
