import { IMeta, ISubstation } from '../../interfaces'

export type TSubstationData = Omit<ISubstation, 'id' | 'slug' | 'userId' | 'fullNameSubstation'>

export type TRespSubstations = { meta: IMeta, data: ISubstation[] }