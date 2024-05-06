import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, isAxiosError } from 'axios'
import { type FC } from "react"
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select'
import { toast } from 'react-toastify'
import { Button, CustomInput, Error, Group, Loader, ValidationMessage } from '../../../../components'
import { useRoles } from '../../../../hooks'
import { UserService } from '../../../../services/user/user.service'
import { TUserData } from '../../../../services/user/user.type'
import { IPropsUserForm, IUserFields } from './userForm.interface'

const UserForm: FC<IPropsUserForm> = ({ user, isEdited, setIsEdited, toggleModal }) => {
  const queryClient = useQueryClient()
	const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<IUserFields>({
		mode: 'onBlur',
		defaultValues: {
			active: user?.active,
			username: user?.username,
			surname: user?.surname,
			name: user?.name,
			patronymic: user?.patronymic,
			position:  user?.position,
			email: user?.email,
			roleId: user?.roleId,
		}
	})
	const { field: {value: roleValue, onChange: roleChange, ...restRoles} } = useController({name: 'roleId', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})

	const { roles, error: errorRoles, isError: isErrorRoles, isLoading: isLoadingRoles } = useRoles()
	const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
		mutationFn: (data: TUserData) => UserService.createUser(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: ['users']})
			toast.success('УЗ пользователя успешно создана!')
			reset()
			toggleModal()
		},
		onError: (errors) => {
			if(isAxiosError(errors)) {
				if (Array.isArray(errors.response?.data)) {
					errors.response?.data.map((errData: AxiosError) => {
						toast.error(errData.message)
					})
				}
			}
		}
	})
	const submit: SubmitHandler<IUserFields> = data => mutateAsync(data)

	if (isPending) return <Loader /> 

  return (
    <>
      <div className="work-log__form">
				{(isErrorMutate) && <Error error={errorMutate} />}
				{(isErrorRoles && errorRoles) && <Error error={errorRoles} />}
				<form className="form form-col" onSubmit={handleSubmit(submit)}>
					<div className="form__content form__content-w-55 form__content-mt">
						<Group className='group-col group-str'>
							<CustomInput
								label='Username'
								name='username'
								register={register}
								errorMessage={errors.username?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 2, message: 'Минимальная длина поля 2 символа!'},
									maxLength: {value: 30, message: 'Максимальная длина поля 300 символов!'}
								}}
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
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 2, message: 'Минимальная длина поля 2 символа!'},
									maxLength: {value: 20, message: 'Максимальная длина поля 20 символов!'}
								}}
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
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 2, message: 'Минимальная длина поля 3 символа!'},
									maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
								}}
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
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 2, message: 'Минимальная длина поля 2 символа!'},
									maxLength: {value: 20, message: 'Максимальная длина поля 20 символов!'}
								}}
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
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 2, message: 'Минимальная длина поля 2 символа!'},
									maxLength: {value: 30, message: 'Максимальная длина поля 30 символов!'}
								}}
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
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Email должен быть формата: xxxx@xxx.xx"}
								}}
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
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 6, message: 'Минимальная длина пароля 6 символов!'},
								}}
								mandatory
								placeholder='Придумайте пароль...'
							/>
						</Group>
						<Group className='group-col group-str'>
							<div className="custom-select-wrapper">
								<label className='label'>
									<span className="label__text">Выберите роль</span>
									<span className='text-mandatory'>*</span>
								</label>
								<AsyncSelect
									classNamePrefix='form__custom-select'
									options={roles}
									getOptionValue={option => option.id.toString()}
									getOptionLabel={option => option.name}
									value={roleValue ? roles?.find(t => t.id === roleValue) : null}
									onChange={option => roleChange(option ? option.id : option)}
									isLoading={isLoadingRoles}
									isDisabled={isErrorRoles}
									isClearable
									placeholder="Выберите роль пользователя..."
									{...restRoles}
								/>
								{errors.roleId && <ValidationMessage className='error-bottom-23' children={errors.roleId?.message} />}
							</div>
						</Group>
						<Group className='group-col'>
							<CustomInput
								className='custom-input-wrapper-row'
								label='УЗ активна?'
								name='active'
								type='checkbox'
								register={register}
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
    </>
  )
}

export default UserForm
