import { TRespSubstations } from '../../../types'

export interface IPropsCardsSubstations {
	substations?: TRespSubstations
	error: Error | null
	isError: boolean
	isLoading: boolean
	page?: number
	setPage?: (page: number) => void
}
