import { IChannel, ISubstationInfo } from '../../../../../interfaces'

export interface IPropsPartsInfo {
  substation: ISubstationInfo | undefined
}

export interface IPropsChannelsInfo {
  channels: IChannel[] | undefined
}
