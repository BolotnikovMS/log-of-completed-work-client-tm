import { ISubstationInfo } from '../../../../../interfaces'
import { TChannelSubstationInfo, TTelemechanicsDevicesSubstationInfo } from '../../../../../types'

export interface IPropsPartsInfo {
	substation: ISubstationInfo | undefined
}

export interface IPropsChannelsInfo {
	channels: TChannelSubstationInfo[] | undefined
}

export interface IPropsTelemechanicDevice {
	telemechanics_devices: TTelemechanicsDevicesSubstationInfo[]
}
