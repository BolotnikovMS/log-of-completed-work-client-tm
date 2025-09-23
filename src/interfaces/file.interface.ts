export interface IFile {
	id: number
	userId: number
	substationId: number
	filePath: string
	typeFile: string
	size: number
	clientName: string
	createdAt: Date
	author?: string | null
}
