import { IChannelCategory, IMeta } from '../../interfaces'

export type TChannelCategoryData = Omit<IChannelCategory, 'id' | 'userId'>

export type TRespChannelCategories = { meta: IMeta, data: IChannelCategory[] }
