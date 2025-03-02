import { IChannel } from '.'
import { TFileList } from '../types'

export interface ISubstationList {
	id: number
	rdu: boolean
	fullNameSubstation: string
	object_type?: string | null
}

export interface ISubstation {
	id: number
	active: boolean
	districtId: number
	voltageClassesId: number
  typeKpId: number
  headControllerId: number
  objectTypeId: number
  name: string
  rdu: boolean
  note?: string | null
}

export interface ISubstationInfo {
	id: number
	active: boolean
	rdu: boolean
  note?: string | null
  fullNameSubstation: string
  numberCompletedWorks?: number
  voltage_class?: string | null
  district?: string | null
  type_kp?: string | null
  head_controller?: string | null
  channels?: IChannel[]
  files_photos_ps?: TFileList[]
  files_backups?: TFileList[]
  other_files?: TFileList[]
  object_type?: string | null
}
