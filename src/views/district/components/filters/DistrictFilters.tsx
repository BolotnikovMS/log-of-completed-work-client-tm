import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Group, Icon, Sort } from '../../../../components'
import { TOrderSort } from '../../../../types/order.types'

const DistrictFilters: FC = () => {
	const [searchParams] = useSearchParams()
	const orderSort = searchParams.get('order') || 'asc'
	const sort = searchParams.get('sort') || 'name'
	const sortOptions = [
		{ value: 'name', label: 'А-Я', icon: <Icon id='sort-asc' />, order: 'asc' as TOrderSort },
		{ value: 'name', label: 'Я-А', icon: <Icon id='sort-desc' />, order: 'desc' as TOrderSort },
	]

	return (
		<Group>
			<Sort orderSort={orderSort as TOrderSort} sort={sort} sortOptions={sortOptions} />
		</Group>
	)
}

export default DistrictFilters
