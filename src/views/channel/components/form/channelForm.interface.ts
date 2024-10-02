import { IChannel } from '../../../../interfaces'

export interface IPropsChannelForm {
  channel?: IChannel | null
  isEdited?: boolean
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}
