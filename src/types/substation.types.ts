import { IMeta, ISubstation, ISubstationList } from '../interfaces'

export type TSubstationData = Omit<ISubstation, 'id'>

export type TSubstationNoteData = Pick<ISubstation, 'note'>

export type TRespSubstations = { meta: IMeta, data: ISubstationList[] }

export type TSubstationsForSelect = Pick<ISubstation, 'id' | 'name'>

export type TSubstationKeyDefect = { keyDefectSubstation?: number | null }
