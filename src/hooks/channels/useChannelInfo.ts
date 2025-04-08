import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ChannelService } from '../../services/channel/channel.service'
import { TChannelInfo } from '../../types'

export const useChannelInfo = (id: number, options: Omit<UseQueryOptions<TChannelInfo, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['channelInfo', id],
		queryFn: () => ChannelService.getChannelInfo(id),
		staleTime: 5 * 60 * 1000,
		...options
	})
}
