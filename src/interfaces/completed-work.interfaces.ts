export interface ICompletedWorkList {
	id: number
	userId: number
	substationId: number
	description: string
	dateCompletion: Date
	inControl: boolean
	work_producer: string
	type_work: string
  substation: string
}

export interface ICompletedWork {
  id: number
  substationId: number
  workProducerId: number
  typeWorkId: number
  description: string
  note?: string | null
  dateCompletion: Date
	inControl: boolean
}

export interface ICompletedWorkInfo {
	id: number
	description: string
  note?: string | null
  dateCompletion: Date
  inControl: boolean
  substation?: string | null
  work_producer?: string | null
  author?: string | null
  type_work: string | null
}
