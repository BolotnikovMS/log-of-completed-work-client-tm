import { IChannel, IMeta } from '../interfaces'

export type TChannelData = Omit<IChannel, 'id' | 'channel_category' | 'channel_type' | 'channel_equipment' | 'gsm_operator' | 'substation'>

export type TRespChannels = { meta: IMeta, data: IChannel[] }
