import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import { errorHandler } from '../../helpers'
import { ChannelTypeService } from '../../services/channel-type/channel-type.service'
import { TChannelTypeData } from '../../services/channel-type/channel-type.type'

export const useUpdateChannelType = (channelTypeId: number, data: TChannelTypeData) => {
  const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => ChannelTypeService.updateChannelType({id: channelTypeId, data}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: ['channelTypes']})

			toast.success('Запись успешно обновлена!')
		},
		onError: (errors) => {
			toast.error(errorHandler(errors))
		}

	})
}
