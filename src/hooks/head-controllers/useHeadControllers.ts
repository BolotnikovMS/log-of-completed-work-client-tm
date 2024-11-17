import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { HeadControllerService } from '../../services/head-controller/head-controller.service'

export const useHeadControllers = ({ page, limit }: IQueryParams) => {
  const { data: headControllers, error, isError, isLoading } = useQuery({
    queryKey: ['headControllers', 'all', page, limit],
    queryFn: () => HeadControllerService.getHeadControllers({ page, limit }),
    staleTime: 1000 * 10,
  })

  return { headControllers, error, isError, isLoading }
}
