import { IChannel, IFile } from '.'

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

export interface ISubstationInfo extends ISubstation {
  fullNameSubstation: string
  numberCompletedWorks?: number
  voltage_class?: string | null
  district?: string | null
  type_kp?: string | null
  head_controller?: string | null
  channels?: IChannel[]
  files_photos_ps?: IFile[]
  files_backups?: IFile[]
  other_files?: IFile[]
  object_type?: string | null
}
