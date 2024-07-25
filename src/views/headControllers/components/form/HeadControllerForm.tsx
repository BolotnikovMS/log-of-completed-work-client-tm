import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { useCreateHeadController, useUpdateHeadController } from '../../../../hooks'
import { IPropsMutation } from '../../../../interfaces'
import { validationSchema } from './headController.validation'
import { IHeadControllerFields, IPropsHeaderControllerForm } from './headControllerForm.interface'

const HeadControllerForm: FC<IPropsHeaderControllerForm> = ({ headController, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IHeadControllerFields>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: headController?.name
    }
  })
  const { mutateAsync: createHeadController, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateHeadController()
  const { mutateAsync: updateHeadController, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateHeadController()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<IHeadControllerFields>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<IHeadControllerFields> = data => handleMutation({ data, mutateFn: createHeadController })
  const submitUpdate: SubmitHandler<IHeadControllerFields> = data => {
    if (!headController?.id) return null

    handleMutation({ data, mutateFn: updateHeadController, id: headController.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form form-col" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <div className="form__content form__content-w-55 form__content-mt">
          <Group className='group-col group-str'>
            <CustomInput
              label='Название контроллера'
              name='name'
              register={register}
              errorMessage={errors.name?.message}
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
    </div>
  )
}

export default HeadControllerForm
