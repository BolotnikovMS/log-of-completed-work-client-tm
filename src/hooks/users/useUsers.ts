import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../services/user/user.service'

export const useUsers = () => {
	const { data, error, isError, isLoading, isFetching } = useQuery({
		queryKey: ['users', 'all'],
		queryFn: () => UserService.getAll({}),
		staleTime: 1000 * 10,
	})

	return { data, error, isError, isLoading, isFetching }
}
