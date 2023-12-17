import { IChannelType, IMeta } from '../../interfaces'

export type TChannelTypeData = Omit<IChannelType, 'id' | 'slug' | 'userId'>

export type TRespChannelTypes = { meta: IMeta, data: IChannelType[] }