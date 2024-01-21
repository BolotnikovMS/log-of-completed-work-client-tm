import { Check } from 'lucide-react'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button } from '../../../../components'
import { useSubstations } from '../../../../hooks/substations/useSubstations'

interface IFiltersFields {
	substation: string | null
}

const CompletedWorkFilters: FC = () => {
	const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
	const { substations, isError: isErrorSubstations, isLoading: isLoadingSubstations } = useSubstations()
	const { handleSubmit, control } = useForm<IFiltersFields>({
		mode: 'onBlur',
		defaultValues: {
			substation: queryParams ? queryParams.get('substation') : null
		}
	})
	const { field: {value: substationValue, onChange: substationOnChange, ...restSubstationField} } = useController({ name: 'substation', control, rules: {required: false }})

	const submit: SubmitHandler<IFiltersFields> = data => {
		if (data.substation) {
			queryParams.set('substation', data?.substation?.toString())
			navigate({ search: queryParams.toString() })
		} else {
			queryParams.delete('substation')
			navigate({ search: queryParams.toString() })
		}
	}

	return (
		<div className="filters">
			<form className="work-log__form form-row" onSubmit={handleSubmit(submit)}>
				<div className="form__content">
					<AsyncSelect
							classNamePrefix='form__custom-select'
							options={substations?.data}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.fullNameSubstation}
							value={substationValue ? substations?.data.find(d => d.id === +substationValue) : null}
							onChange={option => substationOnChange(option ? option.id : option)}
							isLoading={isLoadingSubstations}
							isDisabled={isErrorSubstations}
							isClearable
							placeholder="Выберите ПС..."
							{...restSubstationField}
					/>
				</div>
				<div className="form__btns">
					<Button>
						<Check />
					</Button>
				</div>
			</form>
		</div>
	)
}

export default CompletedWorkFilters