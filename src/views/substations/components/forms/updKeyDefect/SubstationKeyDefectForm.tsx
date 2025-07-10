import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../../components'
import { useUpdateSubstationKeyDefect } from '../../../../../hooks'
import { IPropsForm, IPropsMutation, ISubstationInfo } from '../../../../../interfaces'
import { TSubstationKeyDefect } from '../../../../../types/substation.types'
import { validationSchema } from './substationKeyDefect.validation'

const SubstationKeyDefectForm: FC<IPropsForm<ISubstationInfo>> = ({ data: substation, isEdited, setIsEdited, toggleModal }) => {
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TSubstationKeyDefect>({
		mode: 'all',
		defaultValues: {
			keyDefectSubstation: substation?.keyDefectSubstation
		},
		resolver: yupResolver(validationSchema)
	})
	const { mutateAsync: updateSubstation, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateSubstationKeyDefect()
	const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TSubstationKeyDefect>) => {
		await mutateFn(id ? { id, data } : data)

		reset()
		toggleModal()
		if (isEdited && setIsEdited) setIsEdited(false)
	}
	const submitUpdate: SubmitHandler<TSubstationKeyDefect> = data => {
		if (!substation?.id) return null

		handleMutation({ data, mutateFn: updateSubstation, id: substation.id })
	}
	const errorMessage = (isErrorUpdate && errorUpdate !== null) && <Error error={errorUpdate} />

	if (isPendingUpdate) return <Loader />

	return (
		<div className="work-log__form">
			{errorMessage}
			<form className="form" onSubmit={handleSubmit(submitUpdate)}>
				<Group>
					<Input
						label='Ключ связи с журналом дефектов'
						name='keyDefectSubstation'
						register={register}
						errorMessage={errors.keyDefectSubstation?.message}
						placeholder='Введите ключ...'
						aria-label='Поле ввода ключа связи с журналом дефектов'
					/>
				</Group>
				<div className="form__btns">
					<Button disabled={!isValid} className='mBtn_outline-green' aria-label='Сохранить'>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SubstationKeyDefectForm
