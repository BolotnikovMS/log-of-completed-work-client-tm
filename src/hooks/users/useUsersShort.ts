import { useQuery } from '@tanstack/react-query'
import { IQueryParams } from '../../interfaces'
import { UserService } from '../../services/user/user.service'

export const useUsersShort = ({ active, cleanUser }: IQueryParams) => {
	const isParams = active ? `active:${active}` : cleanUser ? `clean:${cleanUser}` : 'all'
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['usersShort', isParams],
    queryFn: () => UserService.getShortUsers({ active, cleanUser }),
    staleTime: 4 * 60 * 1000,
  })

  return { data, error, isError, isLoading }
}
