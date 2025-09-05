import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { UserService } from '../../services/user/user.service'

export const useUsers = ({ active, cleanUser, limit, page }: IQueryParams) => {
	const isParams = active ? `active:${active}` : cleanUser ? `clean:${cleanUser}` : 'all'
	const { data, error, isError, isLoading, isFetching } = useQuery({
		queryKey: ['users', isParams, limit, page],
		queryFn: () => UserService.getUsers({ active, cleanUser, limit, page }),
		staleTime: 4 * 60 * 1000,
	})

	return { data, error, isError, isLoading, isFetching }
}
