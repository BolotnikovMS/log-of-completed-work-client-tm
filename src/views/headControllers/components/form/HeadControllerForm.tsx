import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IHeadControllerFields, IPropsHeaderControllerForm } from './headControllerForm.interface'

import { AxiosError, isAxiosError } from 'axios'
import { type FC } from 'react'
import { toast } from 'react-toastify'
import { HeadControllerService } from '../../../../services/head-controller/head-controller.service'
import { THeadControllerData } from '../../../../services/head-controller/head-controller.type'

const HeadControllerForm: FC<IPropsHeaderControllerForm> = ({ headController, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IHeadControllerFields>({
    mode: 'onBlur',
    defaultValues: {
      name: headController?.name
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: THeadControllerData) => HeadControllerService.updateHeadController({id: headController!.id, data}) : (data: THeadControllerData) => HeadControllerService.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['headControllers', 'infinity']})

			if (headController !== undefined && headController !== null && setIsEdited) {
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

  const submit: SubmitHandler<IHeadControllerFields> = data => {
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
                label='Название контроллера'
                name='name'
                register={register}
                errorMessage={errors.name?.message}
                validation={{
                  required: {value: true, message: 'Поле является обязательным!'},
                  minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                  maxLength: {value: 150, message: 'Максимальная длина поля 150 символов!'},
                }}
								mandatory={true}
                placeholder='Введите название контроллера...'
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

export default HeadControllerForm