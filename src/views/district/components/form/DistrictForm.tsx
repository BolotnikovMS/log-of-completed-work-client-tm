import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { IDistrictFields, IPropsDistrictForm } from './districtForm.interface'

import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateDistrict, useUpdateDistrict } from '../../../../hooks'
import { IPropsMutation } from '../../../../interfaces'
import { validationSchema } from './district.validation'

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
      <form className="form form-col" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <div className="form__content form__content-w-55 form__content-mt">
          <Group className='group-col group-str'>
            <CustomInput
              label='Название Района или ГП'
              name='name'
              register={register}
              errorMessage={errors.name?.message}
              mandatory={true}
              placeholder='Введите название...'
            />
          </Group>
          <Group className='group-col group-str'>
            <CustomInput
              label='Сокращенное название'
              name='shortName'
              register={register}
              errorMessage={errors.shortName?.message}
              mandatory={true}
              placeholder='Введите сокращенное название...'
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

export default DistrictForm
