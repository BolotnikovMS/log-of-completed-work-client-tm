import { useQuery } from '@tanstack/react-query'
import { RoleService } from '../../services/role/role.service'

export const useRoles = () => {
	const { data: roles, error, isError, isLoading, isFetched } = useQuery({
		queryKey: ['roles', 'all'],
		queryFn: () => RoleService.getRoles(),
		staleTime: 10 * 60 * 1000,
	})

	return { roles, error, isError, isLoading, isFetched }
}
