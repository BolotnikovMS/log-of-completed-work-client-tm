import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Checkbox, Error, Group, Input, Loader, SelectWrapper } from '../../../../../components'
import { useCreateSubstation, useDistricts, useObjectTypes, useUpdateSubstation, useVoltageClasses } from '../../../../../hooks'
import { IPropsForm, IPropsMutation, ISubstation } from '../../../../../interfaces'
import { TSubstationData } from '../../../../../types'
import { validationSchema } from './substation.validation'

const SubstationForm: FC<IPropsForm<ISubstation>> = ({ data: substation, isEdited, setIsEdited, toggleModal }) => {
	const { id } = useParams()
	const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<TSubstationData>({
		mode: 'all',
		defaultValues: {
			districtId: substation?.districtId || (id ? +id : undefined),
			voltageClassesId: substation?.voltageClassesId,
			active: substation?.active,
			rdu: substation?.rdu,
			objectTypeId: substation?.objectTypeId,
			name: substation?.name,
		},
		resolver: yupResolver(validationSchema)
	})
	const { field: { value: districtValue, onChange: districtOnChange, ...restDistrictField } } = useController({ name: 'districtId', control })
	const { field: { value: voltageClassValue, onChange: voltageClassOnChange, ...restVoltageClass } } = useController({ name: 'voltageClassesId', control })
	const { field: { value: objectTypeValue, onChange: objectTypeOnChange, ...restObjectType } } = useController({ name: 'objectTypeId', control })
	const { districts, isLoading: isLoadingDistricts, isError: isErrorDistricts } = useDistricts({})
	const { voltageClasses, isError: isErrorVoltageClasses, isLoading: isLoadingVoltageClasses } = useVoltageClasses({})
	const { data: objectTypes, isError: isErrorObjectTypes, isLoading: isLoadingObjectTypes } = useObjectTypes({})
	const { mutateAsync: createSubstation, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateSubstation()
	const { mutateAsync: updateSubstation, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateSubstation()
	const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TSubstationData>) => {
		await mutateFn(id ? { id, data } : data)

		reset()
		toggleModal()
		if (isEdited && setIsEdited) setIsEdited(false)
	}
	const submitCreate: SubmitHandler<TSubstationData> = data => handleMutation({ data, mutateFn: createSubstation })
	const submitUpdate: SubmitHandler<TSubstationData> = data => {
		if (!substation?.id) return null

		handleMutation({ data, mutateFn: updateSubstation, id: substation.id })
	}
	const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

	if (isPendingCreate || isPendingUpdate) return <Loader />

	return (
		<div className="work-log__form">
			{errorMessage}
			<form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
				<Group>
					<SelectWrapper label='Выберите РЭС или ГП' errorMessage={errors.districtId?.message} mandatory>
						<AsyncSelect
							classNamePrefix='form__custom-select'
							options={districts?.data}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.name}
							value={districtValue ? districts?.data.find(d => d.id === districtValue) : null}
							onChange={option => districtOnChange(option ? option.id : option)}
							isLoading={isLoadingDistricts}
							isDisabled={isErrorDistricts}
							isClearable
							placeholder="Выберите РЭС или ГП..."
							{...restDistrictField}
						/>
					</SelectWrapper>
				</Group>
				<Group>
					<SelectWrapper label='Выберите тип объекта' errorMessage={errors.objectTypeId?.message} mandatory>
						<AsyncSelect
							classNamePrefix='form__custom-select'
							options={objectTypes?.data}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.name}
							value={objectTypeValue ? objectTypes?.data.find(d => d.id === objectTypeValue) : null}
							onChange={option => objectTypeOnChange(option ? option.id : option)}
							isLoading={isLoadingObjectTypes}
							isDisabled={isErrorObjectTypes}
							isClearable
							placeholder="Выберите тип объекта..."
							{...restObjectType}
						/>
					</SelectWrapper>
				</Group>
				<Group>
					<Input
						label='Название объекта'
						name='name'
						register={register}
						errorMessage={errors.name?.message}
						mandatory
						placeholder='Введите название объекта...'
					/>
				</Group>
				<Group>
					<SelectWrapper label='Выберите класс U' errorMessage={errors.voltageClassesId?.message} mandatory>
						<AsyncSelect
							classNamePrefix='form__custom-select'
							options={voltageClasses?.data}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.name}
							value={voltageClassValue ? voltageClasses?.data.find(v => v.id === voltageClassValue) : null}
							onChange={option => voltageClassOnChange(option ? option.id : option)}
							isLoading={isLoadingVoltageClasses}
							isDisabled={isErrorVoltageClasses}
							isClearable
							placeholder="Выберите класс U..."
							{...restVoltageClass}
						/>
					</SelectWrapper>
				</Group>
				<Group className='!flex-row justify-center mt-3'>
					<Group className='checkbox-wrapper'>
						<Checkbox
							name='rdu'
							textLabel='РДУ'
							classLabel='!flex-row'
							aria-label='РДУ'
							register={register}
						/>
					</Group>
					<Group className='checkbox-wrapper'>
						<Checkbox
							name='active'
							textLabel='Используется?'
							classLabel='!flex-row'
							aria-label='РДУ'
							register={register}
						/>
					</Group>
				</Group>
				<div className="form__btns">
					<Button disabled={!isValid} className='mBtn_outline-green'>
						{isEdited ? 'Сохранить' : 'Добавить'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SubstationForm
