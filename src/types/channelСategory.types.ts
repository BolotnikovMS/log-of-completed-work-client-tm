import { IChannelCategory, IMeta } from '../interfaces'

export type TChannelCategoryData = Omit<IChannelCategory, 'id'>

export type TRespChannelCategories = { meta: IMeta, data: IChannelCategory[] }
