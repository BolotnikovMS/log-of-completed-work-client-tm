import { ChangeEvent, useEffect, useState, type FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Input } from '../../../../components'
import { transliterate } from '../../../../helpers'

const SubstationFilters: FC = () => {
	const location = useLocation()
  const navigate = useNavigate()
	const queryParams = new URLSearchParams(location.search)
	const searchParamValue = queryParams.get('search')
	const [searchValue, setSearchValue] = useState<string | null>(searchParamValue)
	const handelSearch = ({target}: ChangeEvent<HTMLInputElement>) => {
		const substationName = target.value

		setSearchValue(substationName)

		if (searchValue && searchValue.length >= 3) {
			queryParams.set('search', transliterate(substationName))
			navigate({ search: queryParams.toString() })
		}
	}

	useEffect(() => {
		if (!searchValue) {
			queryParams.delete('search')
			navigate({ search: queryParams.toString() })
		}
	}, [searchValue])

	return (
		<div className='filters filters-row'>
			<Input
				name='substation'
				type='search'
				onChange={(e) => handelSearch(e)}
				value={searchValue ?? ''}
				autoComplete='off'
				placeholder='Введите название ПС...'
			/>
		</div>
	)
}

export default SubstationFilters