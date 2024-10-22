import { ISubstation, ITypeWork, IUser } from '.'

export interface ICompletedWork {
  id: number
  userId: number
  substationId: number
  workProducerId: number
  typeWorkId: number
  description: string
  note?: string | null
  dateCompletion: Date
  createdAt: Date
  substation: Pick<ISubstation, 'id' | 'fullNameSubstation'>
  work_producer: Pick<IUser, 'id' | 'shortName'>
  author?: Pick<IUser, 'id' | 'shortName'>
  type_work: Pick<ITypeWork, 'id' | 'name'>
}
