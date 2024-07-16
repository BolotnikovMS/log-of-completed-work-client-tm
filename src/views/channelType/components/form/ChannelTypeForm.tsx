import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IChannelTypeFields, IPropsChannelTypeForm, IPropsMutation } from './channelTypeForm.interface'

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
	const handleMutation = async ({ data, mutateFn, id}: IPropsMutation) => {
    try {
      await mutateFn(id ? { id, data } : data)

      reset()
      toggleModal()
      if (isEdited && setIsEdited) setIsEdited(false)
    } catch (error) {
      setError(error as Error)
    }
  }
  const submitCreate: SubmitHandler<IChannelTypeFields> = data => handleMutation({data, mutateFn: createMutate})
  const submitUpdate: SubmitHandler<IChannelTypeFields> = data => {
    if (!channelType?.id) return null
		
    handleMutation({data, mutateFn: updateMutate, id: channelType.id})
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