import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, CustomInput, FormGroup } from '../../components'
import { setTokenToLocalStorage } from '../../helpers/localstorege.helper'
import { ISignInFields, IUserDataLogin } from '../../interfaces'
import { AuthService } from '../../services/auth/auth.service'
import { useAuthStore } from '../../store/auth'


export const SignIn: FC = () => {
	const userAuthStore = useAuthStore()
	const navigate = useNavigate()
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<ISignInFields>({
		mode: 'onBlur'
	})
	const { mutateAsync } = useMutation({
		mutationFn: (data: IUserDataLogin) => {
			userAuthStore.setRequestLoading(true)

			return AuthService.login(data)
		},
		onSuccess: async (data) => {
			// console.log('data: ', data);
			userAuthStore.setRequestLoading(false)
			userAuthStore.setAuthUser(data!.user)
			setTokenToLocalStorage('user_token', data!.token)
			toast.success('Вход выполнен!')
			reset()
			navigate('/')
		},
		onError: (err: AxiosError<string>) => {
			userAuthStore.setRequestLoading(false)
			toast.error(err.response?.data)
			reset({password: ''})
		}
	})
	const submit: SubmitHandler<ISignInFields> = data => mutateAsync(data)

	return (
		<>
			<div className="work-log__form">
				<form className="form form-col" onSubmit={handleSubmit(submit)}>
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
