import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IUser } from '../../interfaces'
import { UserService } from '../../services/user/user.service'

export const useUser = (id: number, options?: Omit<UseQueryOptions<IUser, Error>, 'queryKey'>) => {
	return useQuery({
		queryKey: ['user', id],
		queryFn: () => UserService.getUserById(id),
		staleTime: 4 * 60 * 1000,
		placeholderData: keepPreviousData,
		...options
	})
}
