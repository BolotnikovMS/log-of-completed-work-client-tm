import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IHeadControllerFields, IPropsHeaderControllerForm } from './headControllerForm.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { HeadControllerService } from '../../../../services/head-controller/head-controller.service'
import React from 'react'
import { THeadControllerData } from '../../../../services/head-controller/head-controller.type'
import { isAxiosError } from 'axios'

export const HeadControllerForm: React.FC<IPropsHeaderControllerForm> = ({ headController, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IHeadControllerFields>({
    mode: 'onBlur',
    defaultValues: {
      name: headController?.name
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: THeadControllerData) => HeadControllerService.updateHeadController({id: headController!.id, data}) : (data: THeadControllerData) => HeadControllerService.create(data),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['headControllers']})
    },
  })

  const submit: SubmitHandler<IHeadControllerFields> = (data) => {
    if (headController !== undefined && headController !== null && setIsEdited) {
      mutateAsync(data)
      setIsEdited(false)
      toggleModal()
    }

    mutateAsync(data)
    reset()
    toggleModal()
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
                label='Название контроллера'
                name='name'
                register={register}
                error={errors.name?.message}
                validation={{
                  required: {value: true, message: 'Поле является обязательным!'},
                  minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                  maxLength: {value: 150, message: 'Максимальная длина поля 150 символов!'},
                }}
                placeholder='Введите название контроллера...'
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
