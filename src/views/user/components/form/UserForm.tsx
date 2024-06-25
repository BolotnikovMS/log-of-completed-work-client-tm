import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, isAxiosError } from 'axios'
import { type FC } from "react"
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select'
import { toast } from 'react-toastify'
import { Button, CustomInput, Error, Group, Loader, SelectWrapper } from '../../../../components'
import { useRoles } from '../../../../hooks'
import { UserService } from '../../../../services/user/user.service'
import { TUserData } from '../../../../services/user/user.type'
import { validationSchema } from './user.validation'
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
		},
		resolver: yupResolver(validationSchema)
	})
	const { field: {value: roleValue, onChange: roleChange, ...restRoles} } = useController({name: 'roleId', control })
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
