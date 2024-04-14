import { UserService } from '../../services/user/user.service'
import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['users', 'all'],
    queryFn: () => UserService.getUsers(),
    staleTime: 1000 * 10,
  })

  return { data, error, isError, isLoading, isFetching }
}
