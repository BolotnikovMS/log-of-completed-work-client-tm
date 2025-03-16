import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IChannelEquipment } from '../../interfaces'
import { ChannelEquipmentService } from '../../services/channel-equipment/channel-equipment.service'

export const useChannelEquipment = (id: number, options?: Omit<UseQueryOptions<IChannelEquipment, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['channelEquipment', id],
		queryFn: () => ChannelEquipmentService.getChannelEquipmentById(id),
		staleTime: 4 * 60 * 1000,
		placeholderData: keepPreviousData,
		...options
	})
}
