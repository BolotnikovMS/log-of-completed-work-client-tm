import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from "react"
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select'
import { Button, CustomInput, Error, Group, Loader, SelectWrapper } from '../../../../components'
import { useCreateAccount, useRoles } from '../../../../hooks'
import { IPropsMutation } from '../../../../interfaces'
import { validationSchema } from './user.validation'
import { IPropsUserForm, IUserFields } from './userForm.interface'

const UserForm: FC<IPropsUserForm> = ({ user, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<IUserFields>({
    mode: 'onBlur',
    defaultValues: {
      username: user?.username,
      surname: user?.surname,
      name: user?.name,
      patronymic: user?.patronymic,
      position: user?.position,
      email: user?.email,
      roleId: user?.roleId,
    },
    resolver: yupResolver(validationSchema)
  })
  const { field: { value: roleValue, onChange: roleChange, ...restRoles } } = useController({ name: 'roleId', control })
  const { roles, error: errorRoles, isError: isErrorRoles, isLoading: isLoadingRoles } = useRoles()
  const { mutateAsync: createAccount, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateAccount()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<IUserFields>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<IUserFields> = data => handleMutation({ data, mutateFn: createAccount })
  const errorMessage = (isErrorCreate && errorCreate !== null) && <Error error={errorCreate} />

  if (isPendingCreate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      {(isErrorRoles && errorRoles) && <Error error={errorRoles} />}
      <form className="form form-col" onSubmit={handleSubmit(submitCreate)}>
        <div className="form__content form__content-w-55 form__content-mt">
          <Group className='group-col group-str'>
            <CustomInput
              label='Username'
              name='username'
              register={register}
              errorMessage={errors.username?.message}
              mandatory
              placeholder='Введите username...'
            />
          </Group>
          <Group className='group-col group-str'>
            <CustomInput
              label='Фамилия'
              name='surname'
              register={register}
              errorMessage={errors.surname?.message}
              mandatory
              placeholder='Введите фамилию...'
            />
          </Group>
          <Group className='group-col group-str'>
            <CustomInput
              label='Имя'
              name='name'
              register={register}
              errorMessage={errors.name?.message}
              mandatory
              placeholder='Введите имя...'
            />
          </Group>
          <Group className='group-col group-str'>
            <CustomInput
              label='Отчество'
              name='patronymic'
              register={register}
              errorMessage={errors.patronymic?.message}
              mandatory
              placeholder='Введите отчество...'
            />
          </Group>
          <Group className='group-col group-str'>
            <CustomInput
              label='Должность'
              name='position'
              register={register}
              errorMessage={errors.position?.message}
              mandatory
              placeholder='Введите отчество...'
            />
          </Group>
          <Group className='group-col group-str'>
            <CustomInput
              label='Email'
              name='email'
              type='email'
              register={register}
              errorMessage={errors.email?.message}
              mandatory
              placeholder='Введите email...'
            />
          </Group>
          <Group className='group-col group-str'>
            <CustomInput
              label='Пароль'
              name='password'
              type='password'
              register={register}
              errorMessage={errors.password?.message}
              mandatory
              placeholder='Придумайте пароль...'
            />
          </Group>
          <Group className='group-col group-str'>
            <SelectWrapper label='Выберите роль' errorMessage={errors.roleId?.message} mandatory>
              <AsyncSelect
                classNamePrefix='form__custom-select'
                options={roles}
                getOptionValue={option => option.id.toString()}
                getOptionLabel={option => option.name}
                value={roleValue ? roles?.find(t => t.id === +roleValue) : null}
                onChange={option => roleChange(option ? option.id : option)}
                isLoading={isLoadingRoles}
                isDisabled={isErrorRoles}
                isClearable
                placeholder="Выберите роль пользователя..."
                {...restRoles}
              />
            </SelectWrapper>
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

export default UserForm
