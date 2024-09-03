import { type FC } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { SubstationFlterParameters } from '..'
import { Button, Group, Modal, Search, Sort } from '../../../../components'
import { useModal } from '../../../../hooks'
import { Alert, Filter, FilterRemove, SortAsc, SortDesc } from '../../../../icons'
import { TOrderSort } from '../../../../types/order.types'

const SubstationFilters: FC = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const orderSort = searchParams.get('order') || 'asc'
  const sort = searchParams.get('sort') || 'name'
  const sortOptions = [
    { value: 'name', label: 'А-Я', icon: <SortAsc className='icon' />, order: 'asc' as TOrderSort },
    { value: 'name', label: 'Я-А', icon: <SortDesc className='icon' />, order: 'desc' as TOrderSort },
    { value: 'rdu', label: 'РДУ', icon: <Alert className='icon' />, order: 'desc' as TOrderSort },
  ]
  const typeKpParam = searchParams.get('typeKp')
  const headControllerParam = searchParams.get('headController')
  const { isModal: isModalFilters, toggleModal: toggleModalFilters } = useModal()

  return (
    <>
      <div className='w-full flex gap-1 items-center justify-between'>
        <Group className='!flex-row'>
          <Sort orderSort={orderSort as TOrderSort} sort={sort} sortOptions={sortOptions} />
          {location.pathname === '/substations' && (
            <Button onClick={() => toggleModalFilters()}>
              {typeKpParam || headControllerParam ?
                <FilterRemove className='icon' /> :
                <Filter className='icon' />
              }
            </Button>
          )}
        </Group>
        <div className="search-wrapper">
          <Search
            name='substation'
            classSearch='!input-sm'
            placeholderText='Поиск ПС...'
          />
        </div>
      </div>
      <Modal
        visible={isModalFilters}
        title='Фильтры'
        content={<SubstationFlterParameters toggleModal={toggleModalFilters} />}
        onToggle={toggleModalFilters}
      />
    </>
  )
}

export default SubstationFilters
