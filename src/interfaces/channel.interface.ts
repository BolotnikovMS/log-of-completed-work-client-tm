import { IChannelType } from './channel-type.interface'
import { IChannelCategory } from './channelCategory.interface'
import { IChannelEquipment } from './channelEquipment.intarface'
import { IGsmOperator } from './gsm-operator.interface'
import { ISubstation } from './substation.interface'

export interface IChannel {
  id: number
  userId: number
  substationId: number
  channelCategoryId: number
  channelTypeId: number
  channelEquipmentId?: number | null
  gsmId?: number | null
  ipAddress?: string | null
  note?: string | null
  channel_category?: Pick<IChannelCategory, 'id' | 'name'>
  channel_type?: Pick<IChannelType, 'id' | 'name'>
  substation?: Pick<ISubstation, 'id' | 'fullNameSubstation'>
  channel_equipment?: Pick<IChannelEquipment, 'name'>
  gsm_operator?: Pick<IGsmOperator, 'name'>
}
