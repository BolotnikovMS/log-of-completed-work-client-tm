import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstationsList = ({ offset, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType }: IQueryParams) => {
  const { data: substations, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['substations', 'all', limit, offset, search, sort, order, typeKp, headController, district, channelCategory, channelType],
    queryFn: () => SubstationService.getSubstations({ offset, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType }),
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData
  })

  return { substations, error, isError, isLoading, refetch }
}
