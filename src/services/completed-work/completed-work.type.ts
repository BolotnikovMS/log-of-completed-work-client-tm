import { ICompletedWork, IMeta } from '../../interfaces'

export type TCompletedWorkData = Omit<ICompletedWork, 'id' | 'slug' | 'userId' | 'createdAt' | 'substation' | 'work_producer' | 'shortText'>

export type TRespCompletedWork = { meta: IMeta, data: ICompletedWork[] }