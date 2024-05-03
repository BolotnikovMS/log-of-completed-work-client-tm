import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IPropsVoltageClassForm, IVoltageClassFields } from './voltageClassForm.interface'

import { AxiosError, isAxiosError } from 'axios'
import { type FC } from 'react'
import { toast } from 'react-toastify'
import { VoltageClassService } from '../../../../services/voltage-class/voltage-class.service'
import { TVoltageClass } from '../../../../services/voltage-class/voltage-class.type'

const VoltageClassForm: FC<IPropsVoltageClassForm> = ({ voltageClass, isEdited, toggleModal, setIsEdited }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IVoltageClassFields>({
    mode: 'onBlur',
    defaultValues: {
      name: voltageClass?.name
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TVoltageClass) => VoltageClassService.updateVoltageClass({ id: voltageClass!.id, data }) : (data: TVoltageClass) => VoltageClassService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['voltageClasses', 'infinity'] })

      if (voltageClass !== undefined && voltageClass !== null && setIsEdited) {
        setIsEdited(false)
        toast.success('Запись успешно обновлена!')
      } else {
        toast.success('Запись успешно добавлена!')
      }
      reset()
      toggleModal()
    },
    onError: (errors) => {
      if (isAxiosError(errors)) {
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
            <div className="form__content form__content-w-55 form__content-mt">
              <Group className='group-col group-str'>
                <CustomInput
                  label='Класс напряжения'
                  name='name'
                  register={register}
                  errorMessage={errors.name?.message}
                  validation={{
                    required: { value: true, message: 'Поле является обязательным!' },
                    minLength: { value: 2, message: 'Минимальная длина поля 2 символа!' },
                    maxLength: { value: 20, message: 'Максимальная длина поля 20 символов!' },
                    // pattern: {
                    //   value: /^[0-9+/]+$/,
                    //   message: 'Формат данных: ххх/хх/хх!'
                    // }
                  }}
									mandatory={true}
                  placeholder='Введите класс напряжения...'
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

export default VoltageClassForm
