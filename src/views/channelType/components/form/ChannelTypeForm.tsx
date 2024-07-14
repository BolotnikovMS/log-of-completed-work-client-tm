import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IChannelTypeFields, IPropsChannelTypeForm } from './channelTypeForm.interface'

import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { useCreateChannelType } from '../../../../hooks/channel-types/useCreateChannelType'
import { useUpdateChannelType } from '../../../../hooks/channel-types/useUpdateChannelType'
import { validationSchema } from './channelType.validation'

const ChannelTypeForm: FC<IPropsChannelTypeForm> = ({ channelType, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IChannelTypeFields>({
    mode: 'onBlur',
		resolver: yupResolver(validationSchema),
    defaultValues: {
      name: channelType?.name
    }
  })
	const { mutateAsync: createMutate, isError: isErrorCreate, error: errorCreate, isPending } = useCreateChannelType()
	const { mutateAsync: updateMutate, isError: isErrorUpdate, error: errorUpdate } = useUpdateChannelType()
  const submitCreate: SubmitHandler<IChannelTypeFields> = data => {
		createMutate(data)
		reset()
		toggleModal()
  }
	const submitUpdate: SubmitHandler<IChannelTypeFields> = data => {
		if (!channelType?.id) return null

		updateMutate({id: channelType?.id, data})
		reset()
		toggleModal()

		if (isEdited && setIsEdited) setIsEdited(false)
	}

  return (
		<div className="work-log__form">
			{(isErrorCreate) || (isErrorUpdate) && <Error error={errorCreate || errorUpdate} />}
			{isPending ? 
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