import { IChannel, IDistrict, IFile, IHeadController, ITypeKp, IVoltageClass } from '.'

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
	numberCompletedWorks?: number
	voltage_class?: Pick<IVoltageClass, 'id' | 'name'>
	district?: Pick<IDistrict, 'id' | 'name' | 'shortName'>
	type_kp?: Pick<ITypeKp, 'id' | 'name'>
	head_controller?: Pick<IHeadController, 'id' | 'name'>
	channels?: IChannel[]
	files_photos_ps?: IFile[]
	files_backups?: IFile[]
	other_files?: IFile[]
}