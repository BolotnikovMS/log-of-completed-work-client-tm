import { IHeadController } from '../../../../interfaces'

export interface IHeadControllerFields {
  name: string
}

export interface IPropsHeaderControllerForm {
  headController?: IHeadController | null
  isEdited?: boolean | null
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}