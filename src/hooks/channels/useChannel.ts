import { keepPreviousData, useQuery, UseQueryOptions, } from '@tanstack/react-query'
import { ChannelService } from '../../services/channel/channel.service'
import { IChannel } from '../../interfaces'

export const useChannel = (id: number, options?: Omit<UseQueryOptions<IChannel, Error>, 'queryKey'> ) => {
	return useQuery({
		queryKey: ['channel', id],
		queryFn: () => ChannelService.getChannelById(id),
		staleTime: 10000 * 10,
		placeholderData: keepPreviousData,
		...options
	})
}
