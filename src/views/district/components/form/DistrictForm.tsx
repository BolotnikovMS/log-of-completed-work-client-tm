import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IDistrictFields, IPropsDistrictForm } from './districtForm.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DistrictService } from '../../../../services/district/district.service'
import React from 'react'
import { TDistrictData } from '../../../../services/district/district.type'
import { isAxiosError } from 'axios'

export const DistrictForm: React.FC<IPropsDistrictForm> = ({ district, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IDistrictFields>({
    mode: 'onBlur'
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TDistrictData) => DistrictService.updateDistrict({id: district!.id, data}) : (data: TDistrictData) => DistrictService.create(data),
    onSuccess: async () => {
      await queryClient.cancelQueries({queryKey: ['districts']})
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['districts']})
    }
  })

  const submit: SubmitHandler<IDistrictFields> = (data) => {
    if (district !== undefined && district !== null && setIsEdited) {
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
                  label='Название Района или ГП'
                  name='name'
                  register={register}
                  error={errors.name?.message}
                  validation={{
                    required: {value: true, message: 'Поле является обязательным!'},
                    minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                    maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'},
                  }}
                  placeholder='Введите название...'
                  defaultValue={district?.name}
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
                  defaultValue={district?.shortName}
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
