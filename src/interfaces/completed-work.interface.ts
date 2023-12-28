export interface ICompletedWork {
	id: number
	userId: number
	substationId: number
	workProducerId: number
	description: string
	note: string | null
	createdAt: Date
}