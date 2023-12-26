import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IChannelTypeFields, IPropsChannelTypeForm } from './channelTypeForm.interface';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ChannelTypeService } from '../../../../services/channel-type/channel-type.service'
import React from 'react'
import { TChannelTypeData } from '../../../../services/channel-type/channel-type.type'
import { isAxiosError } from 'axios'

export const ChannelTypeForm: React.FC<IPropsChannelTypeForm> = ({ channelType, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IChannelTypeFields>({
    mode: 'onBlur',
    defaultValues: {
      name: channelType?.name
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TChannelTypeData) => ChannelTypeService.updateChannelType({id: channelType!.id, data}) : (data: TChannelTypeData) => ChannelTypeService.create(data),
    onSuccess: async () => {
      await queryClient.cancelQueries({queryKey: ['channelTypes']})
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['channelTypes']})
    }
  })

  const submit: SubmitHandler<IChannelTypeFields> = (data) => {
    if (channelType !== undefined && channelType !== null && setIsEdited) {
      mutateAsync(data)
      setIsEdited(false)
      toggleModal()
    }
    
    mutateAsync(data)
    reset()
    toggleModal()
  }

  return (
    <>
      <div className="work-log__form">
      {(isErrorMutate && isAxiosError(errorMutate)) && <Error error={errorMutate} />}
      {isPending ? 
        (<Loader />)
      : (
        <form className="form form-col" onSubmit={handleSubmit(submit)}>
          <div className="form__content form__content-col">
            <FormGroup>
              <CustomInput
                label='Наименование канала'
                name='name'
                register={register}
                error={errors.name?.message}
                validation={{
                  required: {value: true, message: 'Поле является обязательным!'},
                  minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                  maxLength: {value: 150, message: 'Максимальная длина поля 150 символов!'},
                }}
                placeholder='Введите наименование...'
              />
            </FormGroup>
          </div>
          <div className="form__btns">
            <Button disabled={!isValid} classBtn='btn-bg_green'>
              {isEdited ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </form>
      )}
      </div>
    </>
  )
}
