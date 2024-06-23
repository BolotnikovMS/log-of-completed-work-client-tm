import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { UserService } from '../../services/user/user.service'

export const useUsers = ({ active, cleanUser }: IQueryParams) => {
	const isParams = active ? `active:${active}` : cleanUser ? `clean:${cleanUser}` : 'all'
  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['users', isParams],
    queryFn: () => UserService.getUsers({ active, cleanUser}),
    staleTime: 1000 * 10,
  })

  return { data, error, isError, isLoading, isFetching }
}
