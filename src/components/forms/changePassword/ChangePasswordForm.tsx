import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useCallback, type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, CustomInput, Error, Group, Loader } from '../..'
import { errorHandler } from '../../../helpers'
import { AuthService } from '../../../services/auth/auth.service'
import { UserService } from '../../../services/user/user.service'
import { IChangePasswordFields, IPropsChangePasswordForm } from './changePassword.interface'
import { validationSchema } from './changePassword.validation'

const ChangePasswordForm: FC<IPropsChangePasswordForm> = ({ user, isResetPassword, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IChangePasswordFields>({
    mode: 'onBlur',
		resolver: yupResolver(validationSchema)
  })
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isResetPassword ? (data: IChangePasswordFields) => UserService.resetPassword(user!.id, data) : (data: IChangePasswordFields) => AuthService.changePassword(data),
    onSuccess: (data) => {
      reset()
      toast.success(data.data)
      toggleModal()
    },
    onError: (errors) => {
      toast.error(errorHandler(errors))
    }
  })
  const submit: SubmitHandler<IChangePasswordFields> = useCallback(data => {
    mutateAsync(data)
  }, [mutateAsync])

  return (
    <div className="work-log__form">
      {(isErrorMutate) && <Error error={errorMutate} />}
      {isPending ? (
        <Loader />
      ) : (
        <form className="form form-col" onSubmit={handleSubmit(submit)}>
          <div className="form__content form__content-w-55 form__content-mt">
            <Group className='group-col group-str'>
              <CustomInput
                label='Введите новый пароль'
                name='password'
                type='password'
                register={register}
                errorMessage={errors.password?.message}
                mandatory
                placeholder='Введите пароль...'
              />
            </Group>
            <Group className='group-col group-str'>
              <CustomInput
                label='Подтвердите новый пароль'
                name='passwordConfirm'
                type='password'
                register={register}
                errorMessage={errors.passwordConfirm?.message}
                mandatory
                placeholder='Введите пароль повторно...'
              />
            </Group>
          </div>
          <div className="form__btns">
            <Button disabled={!isValid} classBtn='btn-bg_green'>
              Сохранить
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ChangePasswordForm
