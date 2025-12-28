import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateGsmOperator, useUpdateGsmOperator } from '../../../../hooks'
import { IGsmOperator, IPropsForm, IPropsMutation } from '../../../../interfaces'
import { TGsmOperatorData } from '../../../../types'
import { validationSchema } from './gsmOperator.validation'

const GsmOperatorForm: FC<IPropsForm<IGsmOperator>> = ({ data: gsmOperator, isEdited, setIsEdited, toggleModal }) => {
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TGsmOperatorData>({
		mode: 'all',
		resolver: yupResolver(validationSchema),
		defaultValues: {
			name: gsmOperator?.name
		}
	})
	const { mutateAsync: createGsmOperator, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateGsmOperator()
	const { mutateAsync: updateGsmOperator, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateGsmOperator()
	const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TGsmOperatorData>) => {
		await mutateFn(id ? { id, data } : data)

		reset()
		toggleModal()
		if (isEdited && setIsEdited) setIsEdited(false)
	}
	const submitCreate: SubmitHandler<TGsmOperatorData> = data => handleMutation({ data, mutateFn: createGsmOperator })
	const submitUpdate: SubmitHandler<TGsmOperatorData> = data => {
		if (!gsmOperator?.id) return null

		handleMutation({ data, mutateFn: updateGsmOperator, id: gsmOperator.id })
	}
	const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

	if (isPendingCreate || isPendingUpdate) return <Loader />

	return (
		<div className="work-log__form">
			{errorMessage}
			<form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
				<Group>
					<Input
						label='Наименование оператора'
						name='name'
						register={register}
						errorMessage={errors.name?.message}
						mandatory={true}
						placeholder='Введите наименование...'
					/>
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

export default GsmOperatorForm
