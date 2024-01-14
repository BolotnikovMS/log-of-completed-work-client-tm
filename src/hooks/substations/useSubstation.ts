import { useQuery } from '@tanstack/react-query'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstation = (id: string | undefined) => {
	const { data: substation, error, isError, isLoading } = useQuery({
		queryKey: ['substation', id],
		queryFn: () => SubstationService.getSubstation(id || ''),
		staleTime: 1000 * 7,
		enabled: !!id,
	})

	return { substation, error, isError, isLoading }
}
