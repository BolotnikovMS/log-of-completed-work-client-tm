import { IMeta, IVoltageClass } from '../interfaces'

export type TVoltageClassData = Omit<IVoltageClass, 'id'>

export type TResponseVoltageClass = { meta: IMeta, data: IVoltageClass[] }
