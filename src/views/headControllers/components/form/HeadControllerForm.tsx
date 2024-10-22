import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateHeadController, useUpdateHeadController } from '../../../../hooks'
import { IHeadController, IPropsForm, IPropsMutation } from '../../../../interfaces'
import { THeadControllerData } from '../../../../types'
import { validationSchema } from './headController.validation'

const HeadControllerForm: FC<IPropsForm<IHeadController>> = ({ data: headController, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<THeadControllerData>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: headController?.name
    }
  })
  const { mutateAsync: createHeadController, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateHeadController()
  const { mutateAsync: updateHeadController, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateHeadController()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<THeadControllerData>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<THeadControllerData> = data => handleMutation({ data, mutateFn: createHeadController })
  const submitUpdate: SubmitHandler<THeadControllerData> = data => {
    if (!headController?.id) return null

    handleMutation({ data, mutateFn: updateHeadController, id: headController.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <Input
            label='Название контроллера'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory={true}
            placeholder='Введите название контроллера...'
          />
        </Group>
        <div className="form__btns">
          <Button disabled={!isValid} className='mBtn_outline-green'>
            {isEdited ? 'Сохранить' : 'Добавить'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default HeadControllerForm
