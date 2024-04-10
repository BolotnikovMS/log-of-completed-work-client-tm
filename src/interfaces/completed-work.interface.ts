import { ISubstation, IUser } from '.'

export interface ICompletedWork {
	id: number
	userId: number
	description: string
	note: string | null
	dateCompletion: Date | string
	createdAt: Date
	substation: Pick<ISubstation, 'id' | 'fullNameSubstation'>
	work_producer: Pick<IUser, 'id' | 'shortName'>
}