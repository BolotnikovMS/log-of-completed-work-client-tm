import { IMeta, ITelemechanicsDevices } from '../interfaces'

export type TTelemechanicsDevice = Omit<ITelemechanicsDevices, 'id'>

export type TRespTelemechanicsDevices = {
	meta: IMeta
	data: ITelemechanicsDevices[]
}
