import { type FC } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { SubstationFlterParameters } from '..'
import { Button, Group, Icon, Modal, Search, Sort } from '../../../../components'
import { useModal } from '../../../../hooks'
import { TOrderSort } from '../../../../types/order.types'
import { EFilterSubstation } from './substationFilter.enum'

const SubstationFilters: FC = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const orderSort = searchParams.get('order') || 'asc'
  const sort = searchParams.get('sort') || 'name'
  const sortOptions = [
    { value: 'name', label: 'А-Я', icon: <Icon id='sort-asc' />, order: 'asc' as TOrderSort },
    { value: 'name', label: 'Я-А', icon: <Icon id='sort-desc' />, order: 'desc' as TOrderSort },
    { value: 'rdu', label: 'РДУ', icon: <Icon id='alter' />, order: 'desc' as TOrderSort },
  ]
  const districtParam = searchParams.get(EFilterSubstation.district)
  const typeKpParam = searchParams.get(EFilterSubstation.typeKp)
  const headControllerParam = searchParams.get(EFilterSubstation.headController)
  const mainChannelParam = searchParams.get(EFilterSubstation.mainChannel)
  const bacupChannelParam = searchParams.get(EFilterSubstation.backupChannel)
  const { isModal: isModalFilters, toggleModal: toggleModalFilters } = useModal()

  return (
    <>
      <div className='w-full flex gap-1 items-center justify-between'>
        <Group className='!flex-row'>
          <Sort orderSort={orderSort as TOrderSort} sort={sort} sortOptions={sortOptions} />
          {location.pathname === '/substations' && (
            <Button onClick={() => toggleModalFilters()}>
              {districtParam || typeKpParam || headControllerParam || mainChannelParam || bacupChannelParam ?
                <Icon id='filter-remove' /> :
                <Icon id='filter' />
              }
              Фильтры
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
