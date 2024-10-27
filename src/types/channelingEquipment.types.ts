import { IChannelEquipment, IMeta } from '../interfaces'

export type TChannelEquipmentData = Omit<IChannelEquipment, 'id'>

export type TRespChannelingEquipment = { meta: IMeta, data: IChannelEquipment[] }
