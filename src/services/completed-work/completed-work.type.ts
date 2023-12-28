import { ICompletedWork, IMeta } from '../../interfaces'

export type TCompletedWorkData = Omit<ICompletedWork, 'id' | 'slug' | 'userId' | 'createdAt'>

export type TRespCompletedWork = { meta: IMeta, data: ICompletedWork[] }