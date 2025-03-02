import { useQuery } from '@tanstack/react-query'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstationInfo = (id: string | undefined) => {
	const { data: substation, error, isError, isLoading } = useQuery({
		queryKey: ['substationInfo', id],
		queryFn: () => SubstationService.getSubstationInfo(id || ''),
		staleTime: 4 * 60 * 1000,
		enabled: !!id,
	})

	return { substation, error, isError, isLoading }
}
