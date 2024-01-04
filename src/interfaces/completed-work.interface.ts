export interface ICompletedWork {
	id: number
	userId: number
	substationId: number
	workProducerId: number
	description: string
	note: string | null
	dateCompletion: Date
	createdAt: Date
	substation: {
		id: number
		name: string
		voltage_class: {
			name: string
		}
		fullNameSubstation: string
	}
	work_producer: {
		id: number
		shortUserName: string
	}
}