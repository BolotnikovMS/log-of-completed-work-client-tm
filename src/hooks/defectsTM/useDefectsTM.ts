import { keepPreviousData, skipToken, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { DefectsTMService } from '../../services/defects/defectsTM.service'

export const useDefectsTM = (id: number | null, { status }: IQueryParams, options?: Omit<UseQueryOptions<number, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['defectsTM', id, status],
		queryFn: id ? () => DefectsTMService.getNumberDefectsByIdSubstation(id, { status }) : skipToken,
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
		...options
	})
}
