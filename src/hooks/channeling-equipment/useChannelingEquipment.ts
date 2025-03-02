import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { ChannelEquipmentService } from '../../services/channel-equipment/channel-equipment.service'

export const useChannelingEquipment = ({ page, limit }: IQueryParams) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['channelingEquipment', 'all', page, limit],
    queryFn: () => ChannelEquipmentService.getChannelingEquipment({ page, limit }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  })

  return { data, error, isError, isLoading }
}
