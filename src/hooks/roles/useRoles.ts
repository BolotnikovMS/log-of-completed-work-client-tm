import { RoleService } from '../../services/role/role.service'
import { useQuery } from '@tanstack/react-query'

export const useRoles = () => {
	const { data: roles, error, isError, isLoading, isFetched } = useQuery({
		queryKey: ['roles', 'all'],
		queryFn: () => RoleService.getRoles(),
		staleTime: 1000 * 10
	})

	return { roles, error, isError, isLoading, isFetched }
}