import { ISubstation, IUser } from '.'

export interface ICompletedWork {
  id: number
  userId: number
  description: string
  shortText: string
  note?: string | null
  dateCompletion: string
  createdAt: Date
  substation?: Pick<ISubstation, 'id' | 'fullNameSubstation'>
  work_producer?: Pick<IUser, 'id' | 'shortName'>
  author?: Pick<IUser, 'id' | 'shortName'>
}
