import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { LogService } from '../../services/log/log.service'

export const useLogs = ({ page, limit, action }: IQueryParams) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['logs', 'all', page, limit, action],
		queryFn: () => LogService.getAllLog({ page, limit, action }),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData
	})

	return { data, error, isError, isLoading }
}
