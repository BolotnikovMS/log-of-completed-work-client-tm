import { ISubstation } from '../../../../../interfaces'

export interface ISubstationFields {
  active: boolean
  districtId: number
  voltageClassesId: number
  typeKpId: number
  headControllerId: number
  mainChannelId: number
  backupChannelId?: number | null
  additionalChannelId?: number | null
  gsmId?: number | null
  name: string
  rdu: boolean
  mainChannelIp?: string | null
  backupChannelIp?: string | null
}

export interface IPropsSubstationForm {
  substation?: ISubstation | null
  isEdited?: boolean
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}