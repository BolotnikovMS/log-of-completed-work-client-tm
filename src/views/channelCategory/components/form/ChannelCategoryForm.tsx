import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateChannelCategory, useUpdateChannelCategory } from '../../../../hooks'
import { IChannelCategory, IPropsForm, IPropsMutation } from '../../../../interfaces'
import { TChannelCategoryData } from '../../../../types'
import { validationSchema } from './channelCategory.validation'

const ChannelCategoryForm: FC<IPropsForm<IChannelCategory>> = ({ data: channelCategory, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TChannelCategoryData>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: channelCategory?.name
    }
  })
  const { mutateAsync: createChannelCategory, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateChannelCategory()
  const { mutateAsync: updateChannelCategory, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateChannelCategory()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TChannelCategoryData>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<TChannelCategoryData> = data => handleMutation({ data, mutateFn: createChannelCategory })
  const submitUpdate: SubmitHandler<TChannelCategoryData> = data => {
    if (!channelCategory?.id) return null

    handleMutation({ data, mutateFn: updateChannelCategory, id: channelCategory.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className='work-log__form'>
      {errorMessage}
      <form className='form' onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <Input
            label='Наименование категорий каналов'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory
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

export default ChannelCategoryForm
