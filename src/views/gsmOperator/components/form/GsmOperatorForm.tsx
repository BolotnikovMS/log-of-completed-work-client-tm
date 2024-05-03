import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IGsmOperatorFields, IPropsGsmOperatorForm } from './gsmOperatorForm.interface'

import { AxiosError, isAxiosError } from 'axios'
import { type FC } from 'react'
import { toast } from 'react-toastify'
import { GsmOperatorService } from '../../../../services/gsm-operator/gsm-operator.service'
import { TGsmOperatorData } from '../../../../services/gsm-operator/gsm-operator.type'

const GsmOperatorForm: FC<IPropsGsmOperatorForm> = ({ gsmOperator, isEdited, setIsEdited, toggleModal }) => {
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

			if (gsmOperator !== undefined && gsmOperator !== null && setIsEdited) {
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

  const submit: SubmitHandler<IGsmOperatorFields> = data => mutateAsync(data)

  return (
    <>
      <div className="work-log__form">
        {(isErrorMutate) && <Error error={errorMutate} />}
        {isPending ? 
          (<Loader />)
        : (
          <form className="form form-col" onSubmit={handleSubmit(submit)}>
            <div className="form__content form__content-w-55 form__content-mt">
              <Group className='group-col group-str'>
                <CustomInput
                  label='Наименование GSM оператора'
                  name='name'
                  register={register}
                  errorMessage={errors.name?.message}
                  validation={{
                    required: {value: true, message: 'Поле является обязательным!'},
                    minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                    maxLength: {value: 150, message: 'Максимальная длина поля 150 символов!'},
                  }}
									mandatory={true}
                  placeholder='Введите наименование...'
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
    </>
  )
}

export default GsmOperatorForm