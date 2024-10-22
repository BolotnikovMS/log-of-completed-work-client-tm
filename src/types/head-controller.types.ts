import { IHeadController, IMeta } from '../interfaces'

export type THeadControllerData = Omit<IHeadController, 'id' | 'userId'>

export type TRespHeadController = { meta: IMeta, data: IHeadController[] }
