export interface ICompletedWork {
  id: number
  userId: number
  substationId: number
  workProducerId: number
  typeWorkId: number
  description: string
  note?: string | null
  dateCompletion: Date
  substation?: string | null
  work_producer?: string | null
  author?: string | null
  type_work: string | null
}
