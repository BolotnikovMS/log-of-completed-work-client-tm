import { AlertCircle, Search, SortAsc, SortDesc } from 'lucide-react'
import { ChangeEvent, useCallback, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Dropdown, Input } from '../../../../components'
import { transliterate } from '../../../../helpers'
import { TOrderSort } from '../../../../types/order.types'

const SubstationFilters: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchValue, setSearchValue ] = useState(searchParams.get('search') || '')
  const orderSort = searchParams.get('order') || 'asc'
  const sort = searchParams.get('sort') || 'name'

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
    <div className='filters filters-row filters-aic'>
      <Dropdown
        children={
					<>
						{orderSort === 'asc' && <SortAsc /> }
						{orderSort === 'desc' && <SortDesc /> }
						{sort === 'rdu' && <AlertCircle /> }
					</>
				}
        menuItems={[
          <Button classBtn='btn-bg_trnt' onClick={() => handleSort('asc')}>
						<SortAsc />
            А-Я
          </Button>,
          <Button classBtn='btn-bg_trnt' onClick={() => handleSort('desc')}>
						<SortDesc />
            Я-А
          </Button>,
          <Button classBtn='btn-bg_trnt' onClick={() => handleSort('desc', 'rdu')}>
						<AlertCircle />
            РДУ
          </Button>
        ]}
      />
			<div className="search-wrapper">
				<Input
					name='substation'
					type='search'
					onChange={(e) => handleSearch(e)}
					value={searchValue}
					autoComplete='off'
					placeholder='Введите название ПС...'
					iconLeft={<Search />}
				/>
			</div>
    </div>
  )
}

export default SubstationFilters
