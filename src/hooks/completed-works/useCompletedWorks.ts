import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { CompletedWorkService } from '../../services/completed-work/completed-work.service'

export const useCompletedWorks = ({ page, limit, substation, executor, dateStart, dateEnd, typeWork, inControl }: IQueryParams) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['completedWorks', 'all', page, limit, substation, executor, dateStart, dateEnd, typeWork, inControl],
    queryFn: () => CompletedWorkService.getAll({ page, limit, substation, executor, dateStart, dateEnd, typeWork, inControl }),
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
  })

  return { data, error, isError, isLoading }
}
