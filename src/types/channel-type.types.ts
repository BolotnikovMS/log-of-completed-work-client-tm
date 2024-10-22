import { IChannelType, IMeta } from '../interfaces'

export type TChannelTypeData = Omit<IChannelType, 'id' | 'userId'>

export type TRespChannelTypes = { meta: IMeta, data: IChannelType[] }
