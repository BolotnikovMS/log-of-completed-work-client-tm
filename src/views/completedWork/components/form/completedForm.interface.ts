import { ICompletedWork } from '../../../../interfaces'

export interface ICompletedWorkFields {
	substationId: number
	workProducerId: number
	description: string
	note: string | null
	dateCompletion: Date
}

export interface IPropsCompletedWorkForm {
	completedWork?: ICompletedWork | null
	isEdited?: boolean | undefined
	toggleModal: () => void
	setIsEdited?: (val: boolean) => void
}