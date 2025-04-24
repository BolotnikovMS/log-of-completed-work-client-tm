import { type FC } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { CardsSubstations } from '../../../../components'
import { useDistrictSubstations } from '../../../../hooks'
import { TOrderSort } from '../../../../types/order.types'

const DistrictSubstationCards: FC = () => {
	const { id } = useParams()
	const [searchParams] = useSearchParams()
	const searchParam = searchParams.get('search')
	const sortParam = searchParams.get('sort')
	const orderParam = searchParams.get('order')
	const { data, error, isError, isLoading } = useDistrictSubstations({ id, search: searchParam, sort: sortParam, order: orderParam as TOrderSort })

	return (
		<CardsSubstations substations={data} error={error} isError={isError} isLoading={isLoading} />
	)
}

export default DistrictSubstationCards
