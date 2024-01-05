import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IPropsVoltageClassForm, IVoltageClassFields } from './voltageClassForm.interface'

import { AxiosError, isAxiosError } from 'axios'
import { type FC } from 'react'
import { toast } from 'react-toastify'
import { VoltageClassService } from '../../../../services/voltage-class/voltage-class.service'
import { TVoltageClass } from '../../../../services/voltage-class/voltage-class.type'

export const VoltageClassForm: FC<IPropsVoltageClassForm> = ({ voltageClass, isEdited, toggleModal, setIsEdited }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IVoltageClassFields>({
    mode: 'onBlur',
    defaultValues: {
      name: voltageClass?.name
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TVoltageClass) => VoltageClassService.updateVoltageClass({id: voltageClass!.id, data}) : (data: TVoltageClass) => VoltageClassService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['voltageClasses', 'infinity']})

			if (voltageClass !== undefined && voltageClass !== null) {
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

  const submit: SubmitHandler<IVoltageClassFields> = data => {
    mutateAsync(data)
  }
  
  return (
    <div className="work-log__form">
      {(isErrorMutate) && <Error error={errorMutate} />}
      {isPending ? 
        (<Loader />)
      : (
        <form className="form form-col" onSubmit={handleSubmit(submit)}>
          <div className="form__content form__content-col">
            <FormGroup >
              <CustomInput
                label='Класс напряжения'
                name='name'
                register={register}
                error={errors.name?.message}
                validation={{
                  required: {value: true, message: 'Поле является обязательным!'},
                  minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                  maxLength: {value: 150, message: 'Максимальная длина поля 150 символов!'},
                  pattern: {
                    value: /^[0-9+/]+$/,
                    message: 'Формат данных: ххх/хх/хх!'
                  }
                }}
                placeholder='Введите класс напряжения...'
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
  )
}
