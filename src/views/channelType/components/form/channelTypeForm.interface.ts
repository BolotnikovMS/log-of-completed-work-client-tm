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

export interface IPropsMutation {
	data: IChannelTypeFields
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mutateFn: (data: any) => Promise<any>
	id?: number
}