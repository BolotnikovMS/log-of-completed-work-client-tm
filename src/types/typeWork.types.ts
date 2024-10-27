import { IMeta, ITypeWork } from '../interfaces'

export type TTypeWorkData = Omit<ITypeWork, 'id'>

export type TRespTypesWork = { meta: IMeta, data: ITypeWork[] }
