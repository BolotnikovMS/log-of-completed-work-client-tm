import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IPropsTypeKpForm, ITypeKpFields } from './typeKpForm.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import React from 'react'
import { TTypeKpData } from '../../../../services/types-kp/type-kp.type'
import { TypeKpService } from '../../../../services/types-kp/type-kp.service'
import { isAxiosError } from 'axios'

export const TypeKpForm: React.FC<IPropsTypeKpForm> = ({ typeKp, isEdited, setIsModal, setIsEdited }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<ITypeKpFields>({
    mode: 'onBlur'
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TTypeKpData) => TypeKpService.updateTypeKp({id: typeKp!.id, data}) : (data: TTypeKpData) => TypeKpService.create(data),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['typesKp']})
    },
  })

  const submit: SubmitHandler<ITypeKpFields> = (data) => {
    if (typeKp !== undefined && typeKp !== null && setIsEdited) {
      mutateAsync(data)
      setIsEdited(false)
      setIsModal(false)
    }

    mutateAsync(data)
    reset()
    setIsModal(false)
  }

  return (
    <div className="work-log__form">
      {(isErrorMutate && isAxiosError(errorMutate)) && <Error error={errorMutate} />}
      {isPending ? 
        (<Loader />)
      : (
        <form className="form form-col" onSubmit={handleSubmit(submit)}>
          <div className="form__content form__content-col">
            <FormGroup>
              <CustomInput
                label='Название КП'
                name='name'
                register={register}
                error={errors.name?.message}
                validation={{
                  required: {value: true, message: 'Поле является обязательным!'},
                  minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                  maxLength: {value: 150, message: 'Максимальная длина поля 150 символов!'},
                }}
                placeholder='Введите название КП...'
                defaultValue={typeKp?.name}
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
