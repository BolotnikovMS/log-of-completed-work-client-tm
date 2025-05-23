import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, Group, Input, Loader } from '../..'
import { useChangePassword, useResetPassword } from '../../../hooks'
import { IPropsMutation } from '../../../interfaces'
import { IChangePasswordFields, IPropsChangePasswordForm } from './changePassword.interface'
import { validationSchema } from './changePassword.validation'

const ChangePasswordForm: FC<IPropsChangePasswordForm> = ({ user, isResetPassword, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IChangePasswordFields>({
    mode: 'all',
    resolver: yupResolver(validationSchema)
  })
  const { mutateAsync: resetPassword, isError: isErrorReset, error: errorReset, isPending: isPendingReset } = useResetPassword()
  const { mutateAsync: changePassword, isError: isErrorChange, error: errorChange, isPending: isPendingChange } = useChangePassword()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<IChangePasswordFields>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
  }
  const submitChange: SubmitHandler<IChangePasswordFields> = data => handleMutation({ data, mutateFn: changePassword })
  const submitReset: SubmitHandler<IChangePasswordFields> = data => {
    if (!user?.id) return null

    handleMutation({ data, mutateFn: resetPassword, id: user.id })
  }
  const errorMessage = (isErrorReset || isErrorChange && errorReset && errorChange !== null) && <Error error={errorReset || errorChange} />

  if (isPendingReset || isPendingChange) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form" onSubmit={handleSubmit(isResetPassword ? submitReset : submitChange)}>
        <Group>
          <Input
            label='Введите новый пароль'
            name='password'
            type='password'
            register={register}
            errorMessage={errors.password?.message}
            mandatory
            placeholder='Введите пароль...'
          />
        </Group>
        <Group>
          <Input
            label='Подтвердите новый пароль'
            name='passwordConfirm'
            type='password'
            register={register}
            errorMessage={errors.passwordConfirm?.message}
            mandatory
            placeholder='Введите пароль повторно...'
          />
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

export default ChangePasswordForm
