import { IUser } from './user'

export interface IFile {
	id: number
	userId: number
	substationId: number
	filePath: string
	typeFile: string
	size: number
	clientName: string
	createdAt: Date
	author?: Pick<IUser, 'id' | 'shortName'>
}