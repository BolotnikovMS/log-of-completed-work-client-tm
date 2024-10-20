import { IMeta, ITypeWork } from '../interfaces'

export type TTypeWorkData = Omit<ITypeWork, 'id' | 'userId'>

export type TRespTypesWork = { meta: IMeta, data: ITypeWork[] }
