import { ISubstationInfo } from '../../../../../interfaces'
import { TChannelSubstationInfo } from '../../../../../types'

export interface IPropsPartsInfo {
  substation: ISubstationInfo | undefined
}

export interface IPropsChannelsInfo {
  channels: TChannelSubstationInfo[] | undefined
}
