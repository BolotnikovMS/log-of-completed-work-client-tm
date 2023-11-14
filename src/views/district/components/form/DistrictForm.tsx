import { Button, CustomInput, Error, FormGroup } from '../../../../components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { DistrictService } from '../../../../services/district/district.service'
import { IDistrictFields } from './districtForm.interface'
import React from 'react'
import { TDistrictData } from '../../../../services/district/district.type'

export const DistrictForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IDistrictFields>({
    mode: 'onBlur'
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate } = useMutation({
    mutationFn: (data: TDistrictData) => DistrictService.create(data),
    onSuccess: async () => {
      await queryClient.cancelQueries(["districts"])
    },
    onSettled: async () => {
      queryClient.invalidateQueries(['districts'])
    }
  })

  const submit: SubmitHandler<IDistrictFields> = (data) => {
    mutateAsync(data)
    reset()
  }

  return (
    <>
      {isErrorMutate && <Error message={(errorMutate as AxiosError).message} />}
      <form className="form" onSubmit={handleSubmit(submit)}>
        <div className="form__content">
          <FormGroup>
            <CustomInput
              label='Название Района или ГП'
              name='name'
              register={register}
              error={errors.name?.message}
              validation={{
                required: {value: true, message: 'Поле является обязательным!'},
                minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
              }}
              placeholder='Введите название...'
            />
          </FormGroup>
          <FormGroup>
            <CustomInput
              label='Сокращенное название'
              name='shortName'
              register={register}
              error={errors.shortName?.message}
              validation={{
                required: {value: true, message: 'Поле является обязательным!'},
                minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
              }}
              placeholder='Введите сокращенное название...'
            />
          </FormGroup>
          <FormGroup className='form__group-row'>
            <CustomInput
              label='Используется?'
              name='active'
              register={register}
              type='checkbox'
            />
          </FormGroup>
        </div>
        <div className="form__btns">
          <Button disabled={!isValid} classBtn='btn-bg_green'>Добавить</Button>
        </div>
      </form>
    </>
  )
}
