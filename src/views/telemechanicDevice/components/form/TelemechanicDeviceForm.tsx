import { type FC } from 'react'
import { useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Error, Group, Loader, SelectWrapper } from '../../../../components'
import { useHeadControllers, useSubstations, useTypesKp } from '../../../../hooks'
import { IPropsForm, ITelemechanicsDevices } from '../../../../interfaces'
import { TTelemechanicsDevice } from '../../../../types'

const TelemechanicDeviceForm: FC<IPropsForm<ITelemechanicsDevices>> = ({ data: telemechanicDevce, isEdited, setIsEdited, toggleModal }) => {
	const { id } = useParams()
	const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<TTelemechanicsDevice>({
		mode: 'all',
		defaultValues: {
			substationId: telemechanicDevce?.substationId,
			typeKpId: telemechanicDevce?.typeKpId,
			headControllerId: telemechanicDevce?.headControllerId,
			note: telemechanicDevce?.note
		}
	})
	const { field: { value: substationValue, onChange: substationOnChange, ...restSubstationField } } = useController({ name: 'substationId', control })
	const { field: { value: typeKpValue, onChange: typeKpOnChange, ...resetTypeKpField } } = useController({ name: 'typeKpId', control })
	const { field: { value: headControllerValue, onChange: headControllerOnChange, ...resetheadControllerField } } = useController({ name: 'headControllerId', control })

	const { substations, isError: isErrorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
	const { headControllers, isError: isErrorHeadControllers, isLoading: isLoadingHeadControllers } = useHeadControllers({})
	const { typesKp, isError: isErrorTypesKp, isLoading: isLoadingTypesKp } = useTypesKp({})

	const errorMessage = (isErrorCreate || isErrorUpdate && errorChannelTypes && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

	if (isPendingCreate || isPendingUpdate) return <Loader />

	return (
		<>
			<div className="form">
				<Group>
					<SelectWrapper label='Выберите объект' errorMessage={errors.substationId?.message} mandatory>
						<AsyncSelect
							classNamePrefix='form__custom-select'
							options={substations?.data}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.fullNameSubstation}
							value={substationValue ? substations?.data.find(d => d.id === substationValue) : null}
							onChange={option => substationOnChange(option ? option.id : option)}
							isLoading={isLoadingSubstations}
							isDisabled={isErrorSubstations}
							isClearable
							placeholder="Выберите объект..."
							{...restSubstationField}
						/>
					</SelectWrapper>
				</Group>
				<Group>
					<SelectWrapper label='Выберите тип КП' errorMessage={errors.typeKpId?.message} mandatory>
						<AsyncSelect
							classNamePrefix='form__custom-select'
							options={typesKp?.data}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.name}
							value={typeKpValue ? typesKp?.data.find(tk => tk.id === typeKpValue) : null}
							onChange={option => typeKpOnChange(option ? option.id : option)}
							isLoading={isLoadingTypesKp}
							isClearable
							placeholder="Выберите тип кп..."
							{...resetTypeKpField}
						/>
					</SelectWrapper>
				</Group>
			</div>
		</>
	)
}

export default TelemechanicDeviceForm
