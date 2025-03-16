import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IObjectType } from '../../interfaces'
import { ObjectTypeService } from '../../services/object-types/object-types.service'

export const useObjectType = (id: number, options?: Omit<UseQueryOptions<IObjectType, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['objectType', id],
		queryFn: () => ObjectTypeService.getObjectTypeById(id),
		staleTime: 4 * 60 * 1000,
		placeholderData: keepPreviousData,
		...options
	})
}
