import { IVoltageClass } from '../../../../interfaces'

export interface IVoltageClassFields {
  name: string
}

export interface IPropsVoltageClassForm {
  voltageClass: IVoltageClass | null
  isEdited: boolean | null
  toggleModal: () => void
  setIsEdited: (val: boolean) => void
}