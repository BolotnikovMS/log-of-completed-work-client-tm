import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group, Input, Loader, SelectWrapper, Textarea } from '../../../../components'
import { useCreateTelemechanicsDevice, useHeadControllers, useSubstations, useTypesKp, useUpdateTelemechanicsDevice } from '../../../../hooks'
import { IPropsForm, IPropsMutation, ITelemechanicsDevices } from '../../../../interfaces'
import { TTelemechanicsDevice } from '../../../../types'
import { validationSchema } from './telemechanicDevice.validation'

const TelemechanicDeviceForm: FC<IPropsForm<ITelemechanicsDevices>> = ({ data: telemechanicDevce, isEdited, setIsEdited, toggleModal }) => {
	const { id } = useParams()
	const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<TTelemechanicsDevice>({
		mode: 'all',
		defaultValues: {
			substationId: telemechanicDevce?.substationId || (id ? +id : undefined),
			typeKpId: telemechanicDevce?.typeKpId,
			headControllerId: telemechanicDevce?.headControllerId,
			controllerFirmwareVersion: telemechanicDevce?.controllerFirmwareVersion,
			note: telemechanicDevce?.note
		},
		resolver: yupResolver(validationSchema)
	})
	const { field: { value: substationValue, onChange: substationOnChange, ...restSubstation } } = useController({ name: 'substationId', control })
	const { field: { value: typeKpValue, onChange: typeKpOnChange, ...restTypeKp } } = useController({ name: 'typeKpId', control })
	const { field: { value: headControllerValue, onChange: headControllerOnChange, ...restHeadController } } = useController({ name: 'headControllerId', control })
	const { substations, isError: isErrorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
	const { headControllers, isError: isErrorHeadControllers, isLoading: isLoadingHeadControllers } = useHeadControllers({})
	const { typesKp, isError: isErrorTypesKp, isLoading: isLoadingTypesKp } = useTypesKp({})
	const { mutateAsync: createTelemechanicsDevice, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateTelemechanicsDevice()
	const { mutateAsync: updateTelemechanicsDevice, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateTelemechanicsDevice()

	const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TTelemechanicsDevice>) => {
		await mutateFn(id ? { id, data } : data)

		reset()
		toggleModal()
		if (isEdited && setIsEdited) setIsEdited(false)
	}
	const submitCreate: SubmitHandler<TTelemechanicsDevice> = data => handleMutation({ data, mutateFn: createTelemechanicsDevice })
	const submitUpdate: SubmitHandler<TTelemechanicsDevice> = data => {
		if (!telemechanicDevce?.id) return null

		handleMutation({ data, mutateFn: updateTelemechanicsDevice, id: telemechanicDevce.id })
	}
	const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

	if (isPendingCreate || isPendingUpdate) return <Loader />

	return (
		<>
			{errorMessage}
			<form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
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
							{...restSubstation}
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
							isDisabled={isErrorTypesKp}
							isClearable
							placeholder="Выберите тип кп..."
							{...restTypeKp}
						/>
					</SelectWrapper>
				</Group>
				<Group>
					<SelectWrapper label='Выберите головной контроллер' errorMessage={errors.headControllerId?.message} mandatory>
						<AsyncSelect
							classNamePrefix='form__custom-select'
							options={headControllers?.data}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.name}
							value={headControllerValue ? headControllers?.data.find(h => h.id === headControllerValue) : null}
							onChange={option => headControllerOnChange(option ? option.id : option)}
							isLoading={isLoadingHeadControllers}
							isDisabled={isErrorHeadControllers}
							isClearable
							placeholder="Выберите головной контроллер..."
							{...restHeadController}
						/>
					</SelectWrapper>
				</Group>
				<Group>
					<Input
						label='Версия прошивки контроллера'
						name='controllerFirmwareVersion'
						register={register}
						errorMessage={errors.controllerFirmwareVersion?.message}
						placeholder='Введите версию прошивки...'
					/>
				</Group>
				<Group>
					<Textarea
						label='Примечание'
						name='note'
						register={register}
						error={errors.note?.message}
						placeholder='Введите примечание...'
					/>
				</Group>
				<Group className='items-center mt-5'>
					<Button disabled={!isValid} className='mBtn_outline-green'>
						{isEdited ? 'Сохранить' : 'Добавить'}
					</Button>
				</Group>
			</form>
		</>
	)
}

export default TelemechanicDeviceForm
