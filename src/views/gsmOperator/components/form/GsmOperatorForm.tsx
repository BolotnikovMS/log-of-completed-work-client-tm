import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IGsmOperatorFields, IPropsGsmOperatorForm } from './gsmOperatorForm.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { GsmOperatorService } from '../../../../services/gsm-operator/gsm-operator.service'
import React from 'react'
import { TGsmOperatorData } from '../../../../services/gsm-operator/gsm-operator.type'
import { isAxiosError } from 'axios'

export const GsmOperatorForm: React.FC<IPropsGsmOperatorForm> = ({ gsmOperator, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IGsmOperatorFields>({
    mode: 'onBlur',
    defaultValues: {
      name: gsmOperator?.name
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TGsmOperatorData) => GsmOperatorService.updateGsmOperator({id: gsmOperator!.id, data}) : (data: TGsmOperatorData) => GsmOperatorService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['gsmOperators']})
    },
  })

  const submit: SubmitHandler<IGsmOperatorFields> = (data) => {
    if (gsmOperator !== undefined && gsmOperator !== null && setIsEdited) {
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
                  label='Наименование GSM оператора'
                  name='name'
                  register={register}
                  error={errors.name?.message}
                  validation={{
                    required: {value: true, message: 'Поле является обязательным!'},
                    minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                    maxLength: {value: 150, message: 'Максимальная длина поля 150 символов!'},
                  }}
                  placeholder='Введите наименование...'
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
