import { ICompletedWork, IMeta } from '../interfaces'

export type TCompletedWorkData = Omit<ICompletedWork, 'id' | 'userId' | 'substation' | 'work_producer' | 'type_work' | 'author'>

export type TRespCompletedWork = { meta: IMeta, data: ICompletedWork[] }
