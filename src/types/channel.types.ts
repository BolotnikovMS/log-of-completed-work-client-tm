import { IChannel, IMeta } from '../interfaces'

export type TChannelData = Omit<IChannel, 'id' | 'channel_category' | 'channel_type' | 'channel_equipment' | 'gsm_operator' | 'substation'>

export type TRespChannels = { meta: IMeta, data: IChannel[] }

export type TChannelInfo = Pick<IChannel, 'id' | 'ipAddress' | 'note' | 'substation' | 'channel_category' | 'channel_type' | 'channel_equipment'>

export type TChannelSubstationInfo = Pick<IChannel, 'id' | 'ipAddress' | 'channel_category_short' | 'channel_type'>
