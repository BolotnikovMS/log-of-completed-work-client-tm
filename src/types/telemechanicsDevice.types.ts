import { IMeta, ITelemechanicsDeviceInfo, ITelemechanicsDevices } from '../interfaces'

export type TTelemechanicsDevice = Omit<ITelemechanicsDevices, 'id'>

export type TRespTelemechanicsDevices = {
	meta: IMeta
	data: ITelemechanicsDevices[]
}

export type TTelemechanicsDevicesSubstationInfo = Omit<ITelemechanicsDeviceInfo, 'substation' | 'controllerFirmwareVersion'>
