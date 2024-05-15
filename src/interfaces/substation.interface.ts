import { IChannelType, IDistrict, IFile, IGsmOperator, IHeadController, ITypeKp, IVoltageClass } from '.'

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
	voltage_class?: Pick<IVoltageClass, 'id' | 'name'>
	district?: Pick<IDistrict, 'id' | 'name'>
	type_kp?: Pick<ITypeKp, 'id' | 'name'>
	head_controller?: Pick<IHeadController, 'id' | 'name'>
	main_channel?: Pick<IChannelType, 'id' | 'name'>
	backup_channel?: Pick<IChannelType, 'id' | 'name'>
	additional_channel?: Pick<IChannelType, 'id' | 'name'>
	gsm?: Pick<IGsmOperator, 'id' | 'name'>
	files_photos_ps?: IFile[]
	files_backups?: IFile[]
}