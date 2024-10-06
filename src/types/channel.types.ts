import { IChannel, IMeta } from '../interfaces'

export type TChannelData = Omit<IChannel, 'id' | 'userId' | 'channel_category' | 'channel_type'>

export type TRespChannels = { meta: IMeta, data: IChannel[] }
