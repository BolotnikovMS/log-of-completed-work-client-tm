import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../../../../components'
import { useCreateDistrict, useUpdateDistrict } from '../../../../hooks'
import { IPropsMutation } from '../../../../interfaces'
import { validationSchema } from './district.validation'
import { IDistrictFields, IPropsDistrictForm } from './districtForm.interface'

const DistrictForm: FC<IPropsDistrictForm> = ({ district, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IDistrictFields>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: district?.name,
      shortName: district?.shortName
    }
  })
  const { mutateAsync: createMutate, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateDistrict()
  const { mutateAsync: updateMutate, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateDistrict()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<IDistrictFields>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<IDistrictFields> = data => handleMutation({ data, mutateFn: createMutate })
  const submitUpdate: SubmitHandler<IDistrictFields> = data => {
    if (!district?.id) return null

    handleMutation({ data, mutateFn: updateMutate, id: district.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <Input
            label='Название Района или ГП'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory={true}
            placeholder='Введите название...'
          />
        </Group>
        <Group>
          <Input
            label='Сокращенное название'
            name='shortName'
            register={register}
            errorMessage={errors.shortName?.message}
            mandatory={true}
            placeholder='Введите сокращенное название...'
          />
        </Group>
        <div className="form__btns">
          <Button className='mBtn_outline-green' disabled={!isValid}>
            {isEdited ? 'Сохранить' : 'Добавить'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default DistrictForm
