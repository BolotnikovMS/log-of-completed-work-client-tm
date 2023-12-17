import { IChannelType } from '../../../../interfaces'

export interface IChannelTypeFields {
  name: string
}

export interface IPropsChannelTypeForm {
  channelType?: IChannelType | null
  isEdited?: boolean | null
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}