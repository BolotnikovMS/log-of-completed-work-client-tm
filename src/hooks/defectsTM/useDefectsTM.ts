import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { DefectsTMService } from '../../services/defects/defectsTM.service'

export const useDefectsTM = (id: number, { status }: IQueryParams, options?: Omit<UseQueryOptions<number, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['defectsTM', id, status],
		queryFn: () => DefectsTMService.getNumberDefectsByIdSubstation(id, { status }),
		staleTime: 5 * 60 * 1000,
	  placeholderData: keepPreviousData,
	  ...options
  })
 }
