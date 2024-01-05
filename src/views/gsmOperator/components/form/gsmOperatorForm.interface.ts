import { IGsmOperator } from '../../../../interfaces'

export interface IGsmOperatorFields {
  name: string
}

export interface IPropsGsmOperatorForm {
  gsmOperator: IGsmOperator | null
  isEdited: boolean | null
  toggleModal: () => void
  setIsEdited: (val: boolean) => void
}