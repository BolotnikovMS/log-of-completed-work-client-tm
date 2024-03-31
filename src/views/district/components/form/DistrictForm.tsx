import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IDistrictFields, IPropsDistrictForm } from './districtForm.interface'

import { toast } from 'react-toastify'
import { errorHandler } from '../../../../helpers/errorHandler.helper'
import { DistrictService } from '../../../../services/district/district.service'
import { TDistrictData } from '../../../../services/district/district.type'

const DistrictForm: FC<IPropsDistrictForm> = ({ district, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IDistrictFields>({
    mode: 'onBlur',
    defaultValues: {
      name: district?.name,
      shortName: district?.shortName
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TDistrictData) => DistrictService.updateDistrict({id: district!.id, data}) : (data: TDistrictData) => DistrictService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['districts', 'infinity']})

			if (district !== undefined && district !== null && setIsEdited) {
				setIsEdited(false)
				toast.success('Запись успешно обновлена!')
			} else {
				toast.success('Запись успешно добавлена!')
			}
			reset()
			toggleModal()
    },
		onError: async (errors) => {
			toast.error(errorHandler(errors))
		},
  })

  const submit: SubmitHandler<IDistrictFields> = data => {
    mutateAsync(data)
  }
  
  return (
    <>
      <div className="work-log__form">
        {(isErrorMutate) && <Error error={errorMutate} />}
        {isPending ? 
          (<Loader />)
        : (
          <form className="form form-col" onSubmit={handleSubmit(submit)}>
            <div className="form__content form__content-mt form__content-col">
              <FormGroup>
                <CustomInput
                  label='Название Района или ГП'
                  name='name'
                  register={register}
                  error={errors.name?.message}
                  validation={{
                    required: {value: true, message: 'Поле является обязательным!'},
                    minLength: {value: 2, message: 'Минимальная длина поля 3 символа!'},
                    maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'},
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
                    minLength: {value: 2, message: 'Минимальная длина поля 3 символа!'},
                    maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
                  }}
                  placeholder='Введите сокращенное название...'
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

export default DistrictForm