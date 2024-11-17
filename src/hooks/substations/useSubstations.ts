import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstations = ({ page, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType }: IQueryParams) => {
  const { data: substations, error, isError, isLoading } = useQuery({
    queryKey: ['substations', 'all', page, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType],
    queryFn: () => SubstationService.getSubstations({ page, limit, search, sort, order, typeKp, headController, district, channelCategory, channelType }),
    staleTime: 1000 * 10,
  })

  return { substations, error, isError, isLoading }
}
