import { IChannelType } from './channel-type.interface'
import { IChannelCategory } from './channelCategory.interface'

export interface IChannel {
  id: number
  userId: number
  substationId: number
  channelCategoryId: number
  channelTypeId: number
  ipAddress: string | null
  note: string | null
  channel_category?: Pick<IChannelCategory, 'id' | 'name'>
  channel_type?: Pick<IChannelType, 'id' | 'name'>
}
