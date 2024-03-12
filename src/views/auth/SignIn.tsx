import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button, CustomInput, FormGroup } from '../../components'
import { IUserDataLogin } from '../../interfaces'
import { AuthService } from '../../services/auth/auth.service'

interface ISignInFields {
	username: string
	password: string
}

export const SignIn: FC = () => {
	const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<ISignInFields>({
		mode: 'onBlur'
	})
  const queryClient = useQueryClient()
	const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
		mutationFn: (data: IUserDataLogin) => AuthService.login(data)
	})

	
	return (
		<>
			<div className="work-log__form">
				<form className="form form-col">
					<div className="form__content form__content-mt form__content-col">
						<FormGroup>
							<CustomInput
								label='Логин'
								name='username'
								register={register}
								error={errors.username?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
								}}
								placeholder='Введите username...'
							/>
						</FormGroup>
						<FormGroup>
							<CustomInput
								label='Пароль'
								name='password'
								type='password'
								register={register}
								error={errors.password?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
								}}
								placeholder='Введите пароль...'
							/>
						</FormGroup>
					</div>
					<div className="form__btns">
						<Button disabled={!isValid} classBtn='btn-bg_green'>
							Войти
						</Button>
					</div>
				</form>
			</div>
		</>
	)
}
