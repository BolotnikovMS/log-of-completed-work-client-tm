import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../components'
import { useCreateObjectType, useUpdateObjectType } from '../../../hooks'
import { IObjectType, IPropsForm, IPropsMutation } from '../../../interfaces'
import { TObjectTypeData } from '../../../types'
import { validationSchema } from './objectType.validation'

const ObjectTypeForm: FC<IPropsForm<IObjectType>> = ({ data: objectType, isEdited, setIsEdited, toggleModal }) => {
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TObjectTypeData>({
		mode: 'all',
		resolver: yupResolver(validationSchema),
		defaultValues: {
			name: objectType?.name,
			shortName: objectType?.shortName,
		}
	})
	const { mutateAsync: createObjectType, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateObjectType()
	const { mutateAsync: updateObjectType, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateObjectType()
	const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TObjectTypeData>) => {
		await mutateFn(id ? { id, data } : data)

		reset()
		toggleModal()
		if (isEdited && setIsEdited) setIsEdited(false)
	}
	const submitCreate: SubmitHandler<TObjectTypeData> = data => handleMutation({ data, mutateFn: createObjectType })
	const submitUpdate: SubmitHandler<TObjectTypeData> = data => {
		if (!objectType?.id) return null

		handleMutation({ data, mutateFn: updateObjectType, id: objectType.id })
	}
	const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

	if (isPendingCreate || isPendingUpdate) return <Loader />

	return (
		<div className='work-log__form'>
			{errorMessage}
			<form className='form' onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
				<Group>
					<Input
						label='Наименование типа объекта'
						name='name'
						register={register}
						errorMessage={errors.name?.message}
						mandatory
						placeholder='Введите наименование...'
					/>
				</Group>
				<Group>
					<Input
						label='Краткое наименование типа объекта'
						name='shortName'
						register={register}
						errorMessage={errors.shortName?.message}
						mandatory
						placeholder='Введите наименование...'
					/>
				</Group>
				<Group className='items-center mt-5'>
					<Button disabled={!isValid} className='mBtn_outline-green'>
						{isEdited ? 'Сохранить' : 'Добавить'}
					</Button>
				</Group>
			</form>
		</div>
	)
}

export default ObjectTypeForm
