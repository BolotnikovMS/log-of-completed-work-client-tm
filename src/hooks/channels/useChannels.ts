import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { ChannelService } from '../../services/channel/channel.service'

export const useChannels = ({ page, limit, substation, channelType, channelCategory }: IQueryParams) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['channels', 'all', page, limit, substation, channelType, channelCategory],
		queryFn: () => ChannelService.getChannels({ page, limit, substation, channelType, channelCategory }),
		staleTime: 1000 * 10,
		placeholderData: keepPreviousData,
	})

	return { data, error, isError, isLoading }
}
