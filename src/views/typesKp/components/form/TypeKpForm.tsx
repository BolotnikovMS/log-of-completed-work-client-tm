import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { useCreateTypeKp, useUpdateTypeKp } from '../../../../hooks'
import { IPropsMutation } from '../../../../interfaces'
import { IPropsTypeKpForm, ITypeKpFields } from './TypeKpForm.interface'
import { validationSchema } from './typesKp.validation'

const TypeKpForm: FC<IPropsTypeKpForm> = ({ typeKp, isEdited, toggleModal, setIsEdited }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<ITypeKpFields>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: typeKp?.name
    }
  })
  const { mutateAsync: createTypeKp, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateTypeKp()
  const { mutateAsync: updateTypeKp, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateTypeKp()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<ITypeKpFields>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<ITypeKpFields> = data => handleMutation({ data, mutateFn: createTypeKp })
  const submitUpdate: SubmitHandler<ITypeKpFields> = data => {
    if (!typeKp?.id) return null

    handleMutation({ data, mutateFn: updateTypeKp, id: typeKp.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  return (
    <div className="work-log__form">
      {errorMessage}
      {isPendingCreate || isPendingUpdate ?
        (<Loader />)
        : (
          <form className="form form-col" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
            <div className="form__content form__content-w-55 form__content-mt">
              <Group className='group-col group-str'>
                <CustomInput
                  label='Название КП'
                  name='name'
                  register={register}
                  errorMessage={errors.name?.message}
                  mandatory={true}
                  placeholder='Введите название КП...'
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

export default TypeKpForm
