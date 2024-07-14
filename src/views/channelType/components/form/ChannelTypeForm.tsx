import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IChannelTypeFields, IPropsChannelTypeForm } from './channelTypeForm.interface'

import { yupResolver } from '@hookform/resolvers/yup'
import { useState, type FC } from 'react'
import { useCreateChannelType, useUpdateChannelType } from '../../../../hooks'
import { validationSchema } from './channelType.validation'

const ChannelTypeForm: FC<IPropsChannelTypeForm> = ({ channelType, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IChannelTypeFields>({
    mode: 'onBlur',
		resolver: yupResolver(validationSchema),
    defaultValues: {
      name: channelType?.name
    }
  })
	const [error, setError] = useState<Error | null>(null)
	const { mutateAsync: createMutate, isError: isErrorCreate, isPending: isPendingCreate } = useCreateChannelType()
	const { mutateAsync: updateMutate, isError: isErrorUpdate, isPending: isPendingUpdate } = useUpdateChannelType()
  const submitCreate: SubmitHandler<IChannelTypeFields> = data => {
		createMutate(data, {
			onSuccess: () => {
				reset()
				toggleModal()
			},
			onError: (errors) => {
				setError(errors)
			}
		})
  }
	const submitUpdate: SubmitHandler<IChannelTypeFields> = async data => {
		if (!channelType?.id) return null

		await updateMutate({id: channelType?.id, data}, {
			// !!! Не работает
			onSuccess: () => {
				reset()
				toggleModal()

				if (isEdited && setIsEdited) setIsEdited(false)
			},
			onError: (errors) => {
				setError(errors)
			}
		})
	}
	const errorMessage = ((isErrorCreate || isErrorUpdate) && error !== null) && <Error error={error} />

  return (
		<div className="work-log__form">
			{errorMessage}
			{isPendingCreate || isPendingUpdate ? 
				(<Loader />) : (
				<form className="form form-col" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
					<div className="form__content form__content-w-55 form__content-mt">
						<Group className='group-col group-str'>
							<CustomInput
								label='Наименование канала'
								name='name'
								register={register}
								errorMessage={errors.name?.message}
								mandatory={true}
								placeholder='Введите наименование...'
							/>
						</Group>
					</div>
					<div className="form__btns">
						<Button disabled={!isValid} classBtn='btn-bg_green'>
							{isEdited ? 'Сохранить' : 'Добавить'}
						</Button>
					</div>
				</form>
			)}
		</div>
  )
}

export default ChannelTypeForm