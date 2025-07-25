import { TChannelSubstationInfo, TFile } from '../types'

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
  channels?: TChannelSubstationInfo[]
  files_photos_ps?: TFile[]
  files_backups?: TFile[]
  other_files?: TFile[]
  object_type?: string | null
  keyDefectSubstation: number | null
}
