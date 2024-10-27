import { IMeta, ISubstation } from '../interfaces'

export type TSubstationData = Omit<ISubstation, 'id' | 'fullNameSubstation' | 'voltage_class' | 'district' | 'type_kp' | 'head_controller' | 'files_photos_ps' | 'files_backups' | 'other_files' | 'channels' | 'numberCompletedWorks'>

export type TRespSubstations = { meta: IMeta, data: ISubstation[] }
