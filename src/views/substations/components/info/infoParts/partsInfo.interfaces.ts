import { ISubstationInfo } from '../../../../../interfaces'
import { ISubstationTelemechanicsDevices } from '../../../../../interfaces/substation.interfaces'
import { TChannelSubstationInfo } from '../../../../../types'

export interface IPropsPartsInfo {
	substation: ISubstationInfo | undefined
}

export interface IPropsChannelsInfo {
	channels: TChannelSubstationInfo[] | undefined
}

export interface IPropsTelemechanicDevice {
	telemechanics_devices: ISubstationTelemechanicsDevices[]
}
