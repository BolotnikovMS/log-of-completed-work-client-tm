import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { ObjectTypeService } from '../../services/object-types/object-types.service'

export const useObjectTypes = ({ page, limit }: IQueryParams) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['objectTypes', 'all', page, limit],
		queryFn: () => ObjectTypeService.getObjectTypes({ page, limit }),
		staleTime: 1000 * 10,
		placeholderData: keepPreviousData,
	})

	return { data, error, isError, isLoading }
}
