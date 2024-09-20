import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select'
import { Button, Error, Group, Loader, SelectWrapper } from '../../../../../components'
import { useRoles } from '../../../../../hooks'
import { useChangeRole } from '../../../../../hooks/users/useChangeRole'
import { IChangeUserRoleFields, IPropsChangeUserRole } from './changeUserRole.interface'
import { validationSchema } from './changeUserRole.validation'

const ChangeUserRole: FC<IPropsChangeUserRole> = ({ user, toggleModal }) => {
  const { handleSubmit, formState: { errors, isValid }, control } = useForm<IChangeUserRoleFields>({
    mode: 'onBlur',
    defaultValues: {
      roleId: user?.roleId
    },
    resolver: yupResolver(validationSchema)
  })
  const { field: { value: roleValue, onChange: roleChange, ...restRoles } } = useController({ name: 'roleId', control })
  const { roles, error: errorRoles, isError: isErrorRoles, isLoading: isLoadingRoles } = useRoles()
  const { mutateAsync, isError: isErrorChangeRole, error: errorChangeRole, isPending: isPendingChangeRole } = useChangeRole(user!.id)
  const submit: SubmitHandler<IChangeUserRoleFields> = data => {
    mutateAsync(data)
    toggleModal()
  }
  const errorMessage = (isErrorChangeRole) && <Error error={errorChangeRole} />

  if (isPendingChangeRole) return <Loader />

  return (
    <div className="work-log__form !h-full">
      {errorMessage}
      {(isErrorRoles && errorRoles) && <Error error={errorRoles} />}
      <form className="form justify-between" onSubmit={handleSubmit(submit)}>
        <Group>
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
        <div className="form__btns">
          <Button disabled={!isValid} className='mBtn_outline-green'>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangeUserRole
