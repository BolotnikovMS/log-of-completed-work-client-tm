import { Button, CustomInput, Error, FormGroup } from '../../../../components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IVoltageClassFields } from './voltageClassForm.interface'
import { Plus } from 'lucide-react'
import React from 'react'
import { TVoltageClass } from '../../../../services/voltage-class/voltage-class.type'
import { VoltageClassService } from '../../../../services/voltage-class/voltage-class.service'
import { isAxiosError } from 'axios'

export const VoltageClassForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IVoltageClassFields>({
    mode: 'onBlur'
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate } = useMutation({
    mutationFn: (data: TVoltageClass) => VoltageClassService.create(data),
    onSuccess: async () => {
      await queryClient.cancelQueries({queryKey: ['voltageClasses']})
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['voltageClasses']})
    }
  })

  const submit: SubmitHandler<IVoltageClassFields> = (data) => {
    mutateAsync(data)
    reset()
  }
  
  return (
    <div className="voltage__form">
      {(isErrorMutate && isAxiosError(errorMutate)) && <Error error={errorMutate} />}
      <form className="form form-row" onSubmit={handleSubmit(submit)}>
        <div className="form__content">
          <FormGroup className='form__group-row'>
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
        <div className="form__btns no_margin">
          <Button disabled={!isValid} classBtn='btn-bg_green'>
            <Plus />
          </Button>
        </div>
      </form>
    </div>
  )
}
