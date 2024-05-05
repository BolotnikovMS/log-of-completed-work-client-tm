import { type FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { useSubstations } from '../../../../hooks'

const CompletedWorkFilters: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
	const substationParamValue = queryParams.get('substation')
  const { substations, isError: isErrorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
	const handelSearch = (option: number | null) => {
		if (option) {
			queryParams.set('substation', option.toString())
			navigate({ search: queryParams.toString() })
		} else {
			queryParams.delete('substation')
      navigate({ search: queryParams.toString() })
		}
	}

  return (
    <div className="filters">
			<AsyncSelect
				classNamePrefix='form__custom-select'
				options={substations?.data}
				value={substationParamValue ? substations?.data.find(s => s.id === +substationParamValue) : null}
				getOptionValue={option => option.id.toString()}
				getOptionLabel={option => option.fullNameSubstation}
				onChange={option => handelSearch(option ? option.id : null)}
				isLoading={isLoadingSubstations}
				isDisabled={isErrorSubstations}
				isClearable
				placeholder="Выберите ПС..."
			/>
    </div>
  )
}

export default CompletedWorkFilters
