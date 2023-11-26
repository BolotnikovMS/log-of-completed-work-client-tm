import { IMeta, ITypeKp } from '../../interfaces'

export type TTypeKpData = Omit<ITypeKp, 'id' | 'slug' | 'userId'>

export type TRespTypesKp = { meta: IMeta, data: ITypeKp[] }