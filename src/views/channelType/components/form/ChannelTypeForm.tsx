import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IChannelTypeFields, IPropsChannelTypeForm } from './channelTypeForm.interface'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError, isAxiosError } from 'axios'
import { type FC } from 'react'
import { toast } from 'react-toastify'
import { ChannelTypeService } from '../../../../services/channel-type/channel-type.service'
import { TChannelTypeData } from '../../../../services/channel-type/channel-type.type'
import { validationSchema } from './channelType.validation'

const ChannelTypeForm: FC<IPropsChannelTypeForm> = ({ channelType, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IChannelTypeFields>({
    mode: 'onBlur',
		resolver: yupResolver(validationSchema),
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
    </>
  )
}

export default ChannelTypeForm