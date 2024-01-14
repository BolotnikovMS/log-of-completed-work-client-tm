export interface ISubstation {
  id: number
  active: boolean
  name: string
  fullNameSubstation: string
  slug: string
  rdu: boolean
  districtId: number
  voltageClassesId: number
  typeKpId: number
  headControllerId: number
  mainChannelId: number
  backupChannelId: number | null
  additionalChannelId: number | null
  gsmId: number | null
  mainChannelIp: string | null
  backupChannelIp?: string | null
	numberCompletedWorks?: number
	voltage_class?: {
		id: number
		name: string
	}
	district?: {
		id: number
		name: string
	}
	type_kp?: {
		id: number
		name: string
	}
	head_controller?: {
		id: number
		name: string
	}
	main_channel?: {
		id: number
		name: string
	}
	backup_channel?: {
		id: number
		name: string
	}
	additional_channel?: {
		id: number
		name: string
	}
	gsm?: {
		id: number
		name: string
	}
}