import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateTypeWork, useUpdateTypeWork } from '../../../../hooks'
import { IPropsForm, IPropsMutation, ITypeWork } from '../../../../interfaces'
import { TTypeWorkData } from '../../../../types/typeWork.types'
import { validationSchema } from './validationSchema.validation'

const TypeWorkForm: FC<IPropsForm<ITypeWork>> = ({ data: typeWork, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TTypeWorkData>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: typeWork?.name
    }
  })
  const { mutateAsync: createTypeWork, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateTypeWork()
  const { mutateAsync: updateTypeWork, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateTypeWork()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TTypeWorkData>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<TTypeWorkData> = data => handleMutation({ data, mutateFn: createTypeWork })
  const submitUpdate: SubmitHandler<TTypeWorkData> = data => {
    if (!typeWork?.id) return null

    handleMutation({ data, mutateFn: updateTypeWork, id: typeWork.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className='work-log__form'>
      {errorMessage}
      <form className='form' onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <Input
            label='Наименование категорий работ'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory
            placeholder='Введите наименование...'
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

export default TypeWorkForm
