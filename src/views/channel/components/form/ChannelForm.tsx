import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group, Input, SelectWrapper, Textarea } from '../../../../components'
import { useChannelCategories, useChannelTypes, useCreateChannel, useSubstations, useUpdateChannel } from '../../../../hooks'
import { IChannel, IPropsForm, IPropsMutation } from '../../../../interfaces'
import { TChannelData } from '../../../../types'
import { validationSchema } from './channelForm.validation'

const ChannelForm: FC<IPropsForm<IChannel>> = ({ data: channel, isEdited, setIsEdited, toggleModal }) => {
  const { id } = useParams()
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<TChannelData>({
    mode: 'onBlur',
    defaultValues: {
      substationId: channel?.substationId || (id ? +id : undefined),
      channelCategoryId: channel?.channelCategoryId,
      channelTypeId: channel?.channelTypeId,
      ipAddress: channel?.ipAddress,
      note: channel?.note
    },
    resolver: yupResolver(validationSchema)
  })
  const { field: { value: substationValue, onChange: substationOnChange, ...restSubstationField } } = useController({ name: 'substationId', control })
  const { field: { value: channelCategoryValue, onChange: channelCategoryOnChange, ...restChannelCategoryField } } = useController({ name: 'channelCategoryId', control })
  const { field: { value: channelTypeValue, onChange: channelTypeOnChange, ...restChannelTypeField } } = useController({ name: 'channelTypeId', control })
  const { substations, isError: isErrorSubstations, error: errorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
  const { data: channelCategories, isError: isErrorChannelCategories, error: errorChannelCategories, isLoading: isLoadingChannelCategories } = useChannelCategories()
  const { data: channelTypes, isError: isErrorChannelTypes, error: errorChannelTypes, isLoading: isLoadingChannelTypes } = useChannelTypes()
  const { mutateAsync: createChannel, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateChannel()
  const { mutateAsync: updateChannel, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateChannel()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TChannelData>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<TChannelData> = data => handleMutation({ data, mutateFn: createChannel })
  const submitUpdate: SubmitHandler<TChannelData> = data => {
    if (!channel?.id) return null

    handleMutation({ data, mutateFn: updateChannel, id: channel.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorChannelTypes && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  return (
    <>
      {errorMessage}
      <form className='form' onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <SelectWrapper label='Выберите объект' errorMessage={errors.substationId?.message} mandatory>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={substations?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.fullNameSubstation}
              value={substationValue ? substations?.data.find(d => d.id === substationValue) : null}
              onChange={option => substationOnChange(option ? option.id : option)}
              isLoading={isLoadingSubstations}
              isDisabled={isErrorSubstations}
              isClearable
              placeholder="Выберите объект..."
              {...restSubstationField}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <SelectWrapper label='Выберите категорию канала' errorMessage={errors.channelCategoryId?.message} mandatory>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={channelCategories?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={channelCategoryValue ? channelCategories?.data.find(d => d.id === channelCategoryValue) : null}
              onChange={option => channelCategoryOnChange(option ? option.id : option)}
              isLoading={isLoadingChannelCategories}
              isDisabled={isErrorChannelCategories}
              isClearable
              placeholder="Выберите категорию канала..."
              {...restChannelCategoryField}
            />
          </SelectWrapper>
        </Group>
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
              placeholder="Выберите категорию канала..."
              {...restChannelTypeField}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <Input
            label='IP адрес канала'
            name='ipAddress'
            register={register}
            errorMessage={errors.ipAddress?.message}
            placeholder='Введите ip адрес...'
          />
        </Group>
        <Group>
          <Textarea
            label='Примечание'
            name='note'
            register={register}
            error={errors.note?.message}
            placeholder='Введите примечание...'
          />
        </Group>
        <Group className='items-center mt-5'>
          <Button disabled={!isValid} className='mBtn_outline-green'>
            {isEdited ? 'Сохранить' : 'Добавить'}
          </Button>
        </Group>
      </form >
    </>
  )
}

export default ChannelForm
