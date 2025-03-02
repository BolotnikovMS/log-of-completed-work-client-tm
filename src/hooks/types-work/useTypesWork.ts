import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { TypeWorkService } from '../../services/type-work/type-work.service'

export const useTypesWork = ({ page, limit }: IQueryParams) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['typesWork', 'all', page, limit],
    queryFn: () => TypeWorkService.getTypesWork({ page, limit }),
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  })

  return { data, error, isError, isLoading }
}
