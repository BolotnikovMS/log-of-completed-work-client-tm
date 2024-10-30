import { IChannel, ISubstation } from '../../../../../interfaces'

export interface IPropsPartsInfo {
  substation: ISubstation | undefined
}

export interface IPropsChannelsInfo {
  channels: IChannel[] | undefined
}
