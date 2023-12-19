import { ISubstation } from '../../../../interfaces'

export interface ISubstationFields {
  active?: boolean
  district: number
  voltageClass: number
  typeKp: number
  headController: number
  mainChannel: number
  backupChannel?: number
  additionalChannel?: number
  gsm: number
  name: string
  rdu?: boolean
  mainChannelIp?: string
  backupChannelIp?: string
}

export interface IPropsSubstationForm {
  substation?: ISubstation | null
  isEdited?: boolean | null
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}