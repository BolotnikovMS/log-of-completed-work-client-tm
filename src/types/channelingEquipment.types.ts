import { IChannelEquipment, IMeta } from '../interfaces'

export type TChannelEquipmentData = Omit<IChannelEquipment, 'id' | 'userId'>

export type TRespChannelingEquipment = { meta: IMeta, data: IChannelEquipment[]}