import { ICompletedWork, ICompletedWorkList, IMeta } from '../interfaces'

export type TCompletedWorkData = Omit<ICompletedWork, 'id'>

export type TRespCompletedWork = { meta: IMeta, data: ICompletedWorkList[] }
