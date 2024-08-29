import { ChangeEvent, useCallback, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SubstationFlterParameters } from '..'
import { Button, Dropdown, Group, Input, Modal } from '../../../../components'
import { transliterate } from '../../../../helpers'
import { useModal } from '../../../../hooks'
import { Alert, Filter, Search, SortAsc, SortDesc } from '../../../../icons'
import { TOrderSort } from '../../../../types/order.types'

const SubstationFilters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '')
  const orderSort = searchParams.get('order') || 'asc'
  const sort = searchParams.get('sort') || 'name'
  const { isModal: isModalFilters, toggleModal: toggleModalFilters } = useModal()

  const handleSearch = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const substationName = target.value

    setSearchValue(substationName)

    if (substationName.length >= 3) {
      searchParams.set('search', transliterate(substationName))
    } else {
      searchParams.delete('search')
    }

    setSearchParams(searchParams)
  }, [searchParams, setSearchParams])

  const handleSort = useCallback((orderValue: TOrderSort, sortValue: string = 'name') => {
    searchParams.set('order', orderValue)
    searchParams.set('sort', sortValue)
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams])

  return (
    <>
      <div className='filters filters-row filters-aic'>
        <Group className='!flex-row'>
          <Dropdown
            classMenu='dropdown-bottom'
            children={
              <>
                {orderSort === 'asc' && <SortAsc className='icon' />}
                {orderSort === 'desc' && <SortDesc className='icon' />}
                {sort === 'rdu' && <Alert className='icon' />}
              </>
            }
            menuItems={[
              <Button onClick={() => handleSort('asc')}>
                <SortAsc className='icon' />
                А-Я
              </Button>,
              <Button onClick={() => handleSort('desc')}>
                <SortDesc className='icon' />
                Я-А
              </Button>,
              <Button onClick={() => handleSort('desc', 'rdu')}>
                <Alert className='icon' />
                РДУ
              </Button>
            ]}
          />
          <Button onClick={() => toggleModalFilters()}>
            <Filter className='icon icon-filter' />
          </Button>
        </Group>
        <div className="search-wrapper">
          <Input
            name='substation'
            type='search'
            onChange={(e) => handleSearch(e)}
            value={searchValue}
            autoComplete='off'
            classInput='!input-sm'
            placeholder='Введите название ПС...'
            iconLeft={<Search className='icon' />}
          />
        </div>
      </div>
      <Modal
        visible={isModalFilters}
        title='Фильтры'
        classDialog=''
        content={<SubstationFlterParameters toggleModal={toggleModalFilters} />}
        onToggle={toggleModalFilters}
      />
    </>
  )
}

export default SubstationFilters
