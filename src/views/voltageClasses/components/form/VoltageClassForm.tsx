import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateVoltageClass, useUpdateVoltageClass } from '../../../../hooks'
import { IPropsForm, IPropsMutation, IVoltageClass } from '../../../../interfaces'
import { TVoltageClassData } from '../../../../types'
import { validationSchema } from './voltageClasses.validation'

const VoltageClassForm: FC<IPropsForm<IVoltageClass>> = ({ data: voltageClass, isEdited, toggleModal, setIsEdited }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TVoltageClassData>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: voltageClass?.name
    }
  })
  const { mutateAsync: createVoltageClass, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateVoltageClass()
  const { mutateAsync: updateVoltageClass, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateVoltageClass()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TVoltageClassData>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<TVoltageClassData> = data => handleMutation({ data, mutateFn: createVoltageClass })
  const submitUpdate: SubmitHandler<TVoltageClassData> = data => {
    if (!voltageClass?.id) return null

    handleMutation({ data, mutateFn: updateVoltageClass, id: voltageClass.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <Input
            label='Класс напряжения'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory
            placeholder='Введите класс напряжения...'
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

export default VoltageClassForm
