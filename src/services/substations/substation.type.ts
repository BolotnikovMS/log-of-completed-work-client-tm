import { IMeta, ISubstation } from '../../interfaces'

export type TSubstationData = Omit<ISubstation, 'id' | 'userId' | 'slug' | 'fullNameSubstation' | 'voltage_class' | 'district' | 'type_kp' | 'head_controller' | 'gsm' | 'files_photos_ps' | 'files_backups' | 'other_files'>

export type TRespSubstations = { meta: IMeta, data: ISubstation[] }