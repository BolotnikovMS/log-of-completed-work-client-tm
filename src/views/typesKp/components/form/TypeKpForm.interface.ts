import { ITypeKp } from '../../../../interfaces'

export interface ITypeKpFields {
  name: string
}

export interface IPropsTypeKpForm {
  typeKp?: ITypeKp | null
  isEdited?: boolean | null
  setIsModal: (val: boolean) => void
  setIsEdited?: (val: boolean) => void
}