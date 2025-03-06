import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstations = ({ page, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType, objectType }: IQueryParams) => {
  const { data: substations, error, isError, isLoading } = useQuery({
    queryKey: ['substations', 'all', page, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType, objectType],
    queryFn: () => SubstationService.getSubstations({ page, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType, objectType }),
    staleTime: 1 * 60 * 1000,
  })

  return { substations, error, isError, isLoading }
}
