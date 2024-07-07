import { AlertCircle, Search, SortAsc, SortDesc } from 'lucide-react'
import { ChangeEvent, useEffect, useState, type FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Dropdown, Input } from '../../../../components'
import { transliterate } from '../../../../helpers'
import { TOrderSort } from '../../../../types/order.types'

const SubstationFilters: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const searchParamValue = queryParams.get('search')
  const [searchValue, setSearchValue] = useState<string | null>(searchParamValue)
	const [orderSort, setOrderSort] = useState<string | null>(queryParams.get('order') || 'asc')
	const [sort, setSort] = useState<string>(queryParams.get('sort') || 'name')
  const handelSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const substationName = target.value

    setSearchValue(substationName)

    if (searchValue && searchValue.length >= 3) {
      queryParams.set('search', transliterate(substationName))
      navigate({ search: queryParams.toString() })
    }
  }
	const handelSort = (orderValue: TOrderSort, sortValue?: string) => {
		const sortParam = new URLSearchParams({
			sort: sortValue ?? 'name',
			order: orderValue
		})
		setOrderSort(orderValue)
		setSort(sortValue ?? 'name')

		navigate({ search: sortParam.toString() })
	}

  useEffect(() => {
    if (!searchValue) {
      queryParams.delete('search')
      navigate({ search: queryParams.toString() })
    }
  }, [searchValue])

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
          <Button classBtn='btn-bg_trnt' onClick={() => handelSort('asc')}>
						<SortAsc />
            А-Я
          </Button>,
          <Button classBtn='btn-bg_trnt' onClick={() => handelSort('desc')}>
						<SortDesc />
            Я-А
          </Button>,
          <Button classBtn='btn-bg_trnt' onClick={() => handelSort('desc', 'rdu')}>
						<AlertCircle />
            РДУ
          </Button>
        ]}
      />
			<div className="search-wrapper">
				<Input
					name='substation'
					type='search'
					onChange={(e) => handelSearch(e)}
					value={searchValue ?? ''}
					autoComplete='off'
					placeholder='Введите название ПС...'
					iconLeft={<Search />}
				/>
			</div>
    </div>
  )
}

export default SubstationFilters
