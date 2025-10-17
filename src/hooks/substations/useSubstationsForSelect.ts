import { useQuery } from '@tanstack/react-query'
import { SubstationService } from '../../services/substations/substation.service'

export const useSubstationsForSelect = () => {
	const { data: substationsForSelect, error, isError, isLoading } = useQuery({
		queryKey: ['substationsSelect'],
		queryFn: () => SubstationService.getSubstationsForSelect(),
		staleTime: 2 * 60 * 1000,
	})

	return { substationsForSelect, error, isError, isLoading }
}
