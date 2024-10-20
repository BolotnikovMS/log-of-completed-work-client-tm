import { ICompletedWork, IMeta } from '../interfaces'

export type TCompletedWorkData = Omit<ICompletedWork, 'id' | 'slug' | 'userId' | 'createdAt' | 'substation' | 'work_producer' | 'shortText' | 'type_work' | 'author'>

export type TRespCompletedWork = { meta: IMeta, data: ICompletedWork[] }
