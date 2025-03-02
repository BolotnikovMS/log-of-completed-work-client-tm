import { IMeta, ISubstation, ISubstationList } from '../interfaces'

export type TSubstationData = Omit<ISubstation, 'id'>

export type TSubstationNoteData = Pick<ISubstation, 'note'>

export type TRespSubstations = { meta: IMeta, data: ISubstationList[] }
