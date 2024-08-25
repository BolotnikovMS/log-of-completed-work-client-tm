import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateChannelType, useUpdateChannelType } from '../../../../hooks'
import { IPropsMutation } from '../../../../interfaces'
import { validationSchema } from './channelType.validation'
import { IChannelTypeFields, IPropsChannelTypeForm } from './channelTypeForm.interface'

const ChannelTypeForm: FC<IPropsChannelTypeForm> = ({ channelType, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IChannelTypeFields>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: channelType?.name
    }
  })
  const { mutateAsync: createChannelType, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateChannelType()
  const { mutateAsync: updateChannelType, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateChannelType()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<IChannelTypeFields>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<IChannelTypeFields> = data => handleMutation({ data, mutateFn: createChannelType })
  const submitUpdate: SubmitHandler<IChannelTypeFields> = data => {
    if (!channelType?.id) return null

    handleMutation({ data, mutateFn: updateChannelType, id: channelType.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <Input
            label='Наименование канала'
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

export default ChannelTypeForm
