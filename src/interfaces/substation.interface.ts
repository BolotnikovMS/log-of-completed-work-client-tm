import { IChannel, IFile } from '.'

export interface ISubstation {
  id: number
  active: boolean
  name: string
  fullNameSubstation: string
  rdu: boolean
  districtId: number
  voltageClassesId: number
  typeKpId: number
  headControllerId: number
  numberCompletedWorks?: number
  note?: string | null
  voltage_class?: string | null
  district?: string | null
  type_kp?: string | null
  head_controller?: string | null
  channels?: IChannel[]
  files_photos_ps?: IFile[]
  files_backups?: IFile[]
  other_files?: IFile[]
}
