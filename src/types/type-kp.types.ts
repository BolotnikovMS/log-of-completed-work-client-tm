import { IMeta, ITypeKp } from '../interfaces'

export type TTypeKpData = Omit<ITypeKp, 'id' | 'numberSubstations'>

export type TRespTypesKp = { meta: IMeta, data: ITypeKp[] }
