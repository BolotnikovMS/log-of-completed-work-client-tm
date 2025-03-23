import { ChangeEvent, useCallback, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon, Input } from '../..'
import { transliterate } from '../../../helpers'
import { IPropsSearch } from './search.interface'

const Search: FC<IPropsSearch> = ({ name, placeholderText = 'Поиск...', classSearch }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchValue, setSearchValue] = useState<string>(searchParams.get('search') || '')

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

	return (
		<Input
			name={name}
			type='search'
			onChange={(e) => handleSearch(e)}
			value={searchValue}
			autoComplete='off'
			classInput={classSearch}
			placeholder={placeholderText}
			iconLeft={
				<Icon id='search' />
			}
		/>
	)
}

export default Search
