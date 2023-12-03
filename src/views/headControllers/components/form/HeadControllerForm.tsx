import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { HeadControllerService } from '../../../../services/head-controller/head-controller.service'
import { IHeadControllerFields } from './headControllerForm.interface'
import { Plus } from 'lucide-react'
import React from 'react'
import { THeadControllerData } from '../../../../services/head-controller/head-controller.type'
import { isAxiosError } from 'axios'

export const HeadControllerForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IHeadControllerFields>({
    mode: 'onBlur'
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: (data: THeadControllerData) => HeadControllerService.create(data),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['headControllers']})
    },
  })

  const submit: SubmitHandler<IHeadControllerFields> = (data) => {
    mutateAsync(data)
    reset()
  }
  
  return (
    <div className="work-log__form">
      {(isErrorMutate && isAxiosError(errorMutate)) && <Error error={errorMutate} />}
      {isPending ? 
        (<Loader />)
      : (
        <form className="form form-row" onSubmit={handleSubmit(submit)}>
          <div className="form__content">
            <FormGroup className='form__group-row'>
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
          <div className="form__btns no_margin">
            <Button disabled={!isValid} classBtn='btn-bg_green'>
              <Plus />
            </Button>
          </div> 
        </form>
      )}
    </div>
  )
}
