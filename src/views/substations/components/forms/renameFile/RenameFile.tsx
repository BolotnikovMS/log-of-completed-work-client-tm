import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../../components'
import { useUpdateFileName } from '../../../../../hooks'
import { IPropsForm, IPropsMutation } from '../../../../../interfaces'
import { TFile, TFileUpdName } from '../../../../../types'
import { validationSchema } from './renameFile.validation'

const RenameFile: FC<IPropsForm<TFile>> = ({ data: file, isEdited, setIsEdited, toggleModal }) => {
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TFileUpdName>({
		mode: 'all',
		defaultValues: {
			clientName: file?.clientName
		},
		resolver: yupResolver(validationSchema)
	})
	const { mutateAsync: updateFileName, isError, error, isPending } = useUpdateFileName()
	const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TFileUpdName>) => {
		await mutateFn(id ? { id, data } : data)

		reset()
		toggleModal()
		if (isEdited && setIsEdited) setIsEdited(false)
	}
	const submitUpdate: SubmitHandler<TFileUpdName> = data => {
		if (!file?.id) return null

		handleMutation({ data, mutateFn: updateFileName, id: file.id })
	}
	const errorMessage = (isError && error !== null) && <Error error={error} />

	if (isPending) return <Loader />

	return (
		<div className="work-log__form">
			{errorMessage}
			<form className='form' onSubmit={handleSubmit(submitUpdate)}>
				<Group>
					<Input
						label='Введите новое имя файла'
						name='clientName'
						register={register}
						errorMessage={errors.clientName?.message}
						placeholder='Введите новое имя файла...'
						aria-label='Поле ввода нового имени файла.'
					/>
				</Group>
				<Group className='items-center mt-5'>
					<Button disabled={!isValid} className='mBtn_outline-green'>
						Сохранить
					</Button>
				</Group>
			</form>
		</div>
	)
}

export default RenameFile
