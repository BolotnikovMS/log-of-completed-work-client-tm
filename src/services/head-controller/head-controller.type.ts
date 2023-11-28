import { IHeadController } from '../../interfaces/head-controller.interface'
import { IMeta } from '../../interfaces'

export type THeadControllerData = Omit<IHeadController, 'id' | 'slug' | 'userId'>

export type TRespHeadController = { meta: IMeta, data: IHeadController[]}