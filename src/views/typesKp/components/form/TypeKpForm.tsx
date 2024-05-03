import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IPropsTypeKpForm, ITypeKpFields } from './TypeKpForm.interface'

import { AxiosError, isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { TypeKpService } from '../../../../services/types-kp/type-kp.service'
import { TTypeKpData } from '../../../../services/types-kp/type-kp.type'

const TypeKpForm: FC<IPropsTypeKpForm> = ({ typeKp, isEdited, toggleModal, setIsEdited }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<ITypeKpFields>({
    mode: 'onBlur',
    defaultValues: {
      name: typeKp?.name
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TTypeKpData) => TypeKpService.updateTypeKp({id: typeKp!.id, data}) : (data: TTypeKpData) => TypeKpService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['typesKp', 'infinity']})

			if (typeKp !== undefined && typeKp !== null && setIsEdited) {
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

  const submit: SubmitHandler<ITypeKpFields> = data => {
    mutateAsync(data)
  }

  return (
    <div className="work-log__form">
      {(isErrorMutate) && <Error error={errorMutate} />}
      {isPending ?
        (<Loader />)
      : (
        <form className="form form-col" onSubmit={handleSubmit(submit)}>
          <div className="form__content form__content-w-55 form__content-mt">
            <Group className='group-col group-str'>
              <CustomInput
                label='Название КП'
                name='name'
                register={register}
                errorMessage={errors.name?.message}
                validation={{
                  required: {value: true, message: 'Поле является обязательным!'},
                  minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                  maxLength: {value: 150, message: 'Максимальная длина поля 150 символов!'},
                }}
								mandatory={true}
                placeholder='Введите название КП...'
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

export default TypeKpForm