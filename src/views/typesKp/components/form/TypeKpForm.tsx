import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateTypeKp, useUpdateTypeKp } from '../../../../hooks'
import { IPropsForm, IPropsMutation, ITypeKp } from '../../../../interfaces'
import { TTypeKpData } from '../../../../types'
import { validationSchema } from './typesKp.validation'

const TypeKpForm: FC<IPropsForm<ITypeKp>> = ({ data: typeKp, isEdited, toggleModal, setIsEdited }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TTypeKpData>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: typeKp?.name
    }
  })
  const { mutateAsync: createTypeKp, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateTypeKp()
  const { mutateAsync: updateTypeKp, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateTypeKp()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TTypeKpData>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<TTypeKpData> = data => handleMutation({ data, mutateFn: createTypeKp })
  const submitUpdate: SubmitHandler<TTypeKpData> = data => {
    if (!typeKp?.id) return null

    handleMutation({ data, mutateFn: updateTypeKp, id: typeKp.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <Input
            label='Название КП'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory={true}
            placeholder='Введите название КП...'
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

export default TypeKpForm
