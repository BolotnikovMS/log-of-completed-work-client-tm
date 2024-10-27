import { IChannelType, IMeta } from '../interfaces'

export type TChannelTypeData = Omit<IChannelType, 'id'>

export type TRespChannelTypes = { meta: IMeta, data: IChannelType[] }
