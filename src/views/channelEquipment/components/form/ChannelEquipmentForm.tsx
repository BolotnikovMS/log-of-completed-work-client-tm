import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select'
import { Button, Error, Group, Input, Loader, SelectWrapper } from '../../../../components'
import { useChannelTypes, useCreateChannelEquipment, useUpdateChannelEquipment } from '../../../../hooks'
import { IChannelEquipment, IPropsForm, IPropsMutation } from '../../../../interfaces'
import { TChannelEquipmentData } from '../../../../types'
import { validationSchema } from './channelEquipment.validation'

const ChannelEquipmentForm: FC<IPropsForm<IChannelEquipment>> = ({ data: channelEquipment, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<TChannelEquipmentData>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      channelTypeId: channelEquipment?.channelTypeId,
      name: channelEquipment?.name
    }
  })
  const { field: { value: channelTypeValue, onChange: channelTypeOnChange, ...restChannelTypeField } } = useController({ name: 'channelTypeId', control })
  const { data: channelTypes, isError: isErrorChannelTypes, error: errorChannelTypes, isLoading: isLoadingChannelTypes } = useChannelTypes()
  const { mutateAsync: createChannelEquipment, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateChannelEquipment()
  const { mutateAsync: updateChannelEquipment, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateChannelEquipment()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TChannelEquipmentData>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<TChannelEquipmentData> = data => handleMutation({ data, mutateFn: createChannelEquipment })
  const submitUpdate: SubmitHandler<TChannelEquipmentData> = data => {
    if (!channelEquipment?.id) return null

    handleMutation({ data, mutateFn: updateChannelEquipment, id: channelEquipment.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorChannelTypes && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <>
      {errorMessage}
      <form className='form' onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <SelectWrapper label='Выберите тип канала' errorMessage={errors.channelTypeId?.message} mandatory>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={channelTypes?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={channelTypeValue ? channelTypes?.data.find(d => d.id === channelTypeValue) : null}
              onChange={option => channelTypeOnChange(option ? option.id : option)}
              isLoading={isLoadingChannelTypes}
              isDisabled={isErrorChannelTypes}
              isClearable
              placeholder="Выберите тип канала..."
              {...restChannelTypeField}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <Input
            label='Наименование оборудования'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
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
    </>
  )
}

export default ChannelEquipmentForm
