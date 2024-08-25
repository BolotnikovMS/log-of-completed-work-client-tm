import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateGsmOperator, useUpdateGsmOperator } from '../../../../hooks'
import { IPropsMutation } from '../../../../interfaces'
import { validationSchema } from './gsmOperator.validation'
import { IGsmOperatorFields, IPropsGsmOperatorForm } from './gsmOperatorForm.interface'

const GsmOperatorForm: FC<IPropsGsmOperatorForm> = ({ gsmOperator, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IGsmOperatorFields>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: gsmOperator?.name
    }
  })
  const { mutateAsync: createGsmOperator, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateGsmOperator()
  const { mutateAsync: updateGsmOperator, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateGsmOperator()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<IGsmOperatorFields>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<IGsmOperatorFields> = data => handleMutation({ data, mutateFn: createGsmOperator })
  const submitUpdate: SubmitHandler<IGsmOperatorFields> = data => {
    if (!gsmOperator?.id) return null

    handleMutation({ data, mutateFn: updateGsmOperator, id: gsmOperator.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <Input
            label='Наименование GSM оператора'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory={true}
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

export default GsmOperatorForm
