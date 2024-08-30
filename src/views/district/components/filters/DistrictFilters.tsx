import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Group, Sort } from '../../../../components'
import { SortAsc, SortDesc } from '../../../../icons'
import { TOrderSort } from '../../../../types/order.types'

const DistrictFilters: FC = () => {
  const [searchParams] = useSearchParams()
  const orderSort = searchParams.get('order') || 'asc'
  const sort = searchParams.get('sort') || 'name'
  const sortOptions = [
    { value: 'name', label: 'А-Я', icon: <SortAsc className='icon' />, order: 'asc' as TOrderSort },
    { value: 'name', label: 'Я-А', icon: <SortDesc className='icon' />, order: 'desc' as TOrderSort },
  ]

  return (
    <Group>
      <Sort orderSort={orderSort as TOrderSort} sort={sort} sortOptions={sortOptions} />
    </Group>
  )
}

export default DistrictFilters
