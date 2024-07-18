import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
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
                  label='Наименование GSM оператора'
                  name='name'
                  register={register}
                  errorMessage={errors.name?.message}
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
  )
}

export default GsmOperatorForm
