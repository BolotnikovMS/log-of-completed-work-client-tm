import { IMeta, IVoltageClass } from '../interfaces'

export type TVoltageClassData = Omit<IVoltageClass, 'id' | 'userId'>

export type TResponseVoltageClass = { meta: IMeta, data: IVoltageClass[] }
