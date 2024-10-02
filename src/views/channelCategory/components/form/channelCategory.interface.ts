import { IChannelCategory } from '../../../../interfaces'

export interface IPropsChannelCategoryForm {
  channelCategory?: IChannelCategory | null
  isEdited?: boolean | null
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}

export interface IChannelCategoryFields {
  name: string
}
