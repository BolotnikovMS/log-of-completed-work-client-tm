import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IChannelTypeFields, IPropsChannelTypeForm } from './channelTypeForm.interface'

import { AxiosError, isAxiosError } from 'axios'
import { type FC } from 'react'
import { toast } from 'react-toastify'
import { ChannelTypeService } from '../../../../services/channel-type/channel-type.service'
import { TChannelTypeData } from '../../../../services/channel-type/channel-type.type'

const ChannelTypeForm: FC<IPropsChannelTypeForm> = ({ channelType, isEdited, setIsEdited, toggleModal }) => {
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
      await queryClient.invalidateQueries({queryKey: ['channelTypes']})

			if (channelType !== undefined && channelType !== null && setIsEdited) {
				setIsEdited(false)
				toast.success('Запись успешно обновлена!')
			} else {
				toast.success('Запись успешно добавлена!')
			}
			reset()
			toggleModal()
    },
		onError: (errors) => {
			if(isAxiosError(errors)) {
				if (Array.isArray(errors.response?.data)) {
					errors.response?.data.map((errData: AxiosError) => {
						toast.error(errData.message)
					})
				}
			}
		}
  })

  const submit: SubmitHandler<IChannelTypeFields> = data => {
    mutateAsync(data)
  }

  return (
    <>
      <div className="work-log__form">
      {(isErrorMutate) && <Error error={errorMutate} />}
      {isPending ? 
        (<Loader />)
      : (
        <form className="form form-col" onSubmit={handleSubmit(submit)}>
          <div className="form__content form__content-mt form__content-col">
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

export default ChannelTypeForm