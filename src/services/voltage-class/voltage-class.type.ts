import { IMeta, IVoltageClass } from '../../interfaces'

export type TVoltageClass = Omit<IVoltageClass, 'id' | 'slug' | 'userId'>

export type TResponseVoltageClass = { meta: IMeta, data: IVoltageClass[] }