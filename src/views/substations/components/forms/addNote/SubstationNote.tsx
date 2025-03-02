import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Loader, Textarea } from '../../../../../components'
import { useUpdateSubstationNote } from '../../../../../hooks'
import { IPropsForm, IPropsMutation, ISubstationInfo } from '../../../../../interfaces'
import { TSubstationNoteData } from '../../../../../types'
import { validationSchema } from './substationNote.validation'

const SubstationNote: FC<IPropsForm<ISubstationInfo>> = ({ data: substation, isEdited, setIsEdited, toggleModal }) => {
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TSubstationNoteData>({
		mode: 'all',
		defaultValues: {
			note: substation?.note
		},
		resolver: yupResolver(validationSchema)
	})
	const { mutateAsync: updateSubstation, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateSubstationNote()

	const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TSubstationNoteData>) => {
		await mutateFn(id ? { id, data } : data)

		reset()
		toggleModal()
		if (isEdited && setIsEdited) setIsEdited(false)
	}
	const submitUpdate: SubmitHandler<TSubstationNoteData> = data => {
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
					<Textarea
						label='Примечание'
						name='note'
						register={register}
						className='!h-28'
						error={errors.note?.message}
						placeholder='Введите примечание...'
						aria-label='Поле ввода примечания'
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

export default SubstationNote
