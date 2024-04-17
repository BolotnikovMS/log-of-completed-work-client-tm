import { type FC } from "react"
import { useForm } from 'react-hook-form'
import { Button, CustomInput, Group } from '../../../../components'
import { IPropsUserForm, IUserFields } from './userForm.interface'

const UserForm: FC<IPropsUserForm> = ({ user, isEdited, setIsEdited, toggleModal }) => {
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
	// const { field: {value: activeValue, onChange: activeOnChange, ...restActiveField} } = useController({name: 'active', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
	// const {} = useController({name: 'username'})
  return (
    <>
      <div className="work-log__form">
				{/* {(isErrorMutate) && <Error error={errorMutate} />} */}
				<form className="form form-col">
					<div className="form__content form__content-mt form__content-col">
						<Group className='group-str'>
							<CustomInput
								label='Username'
								name='username'
								register={register}
								error={errors.username?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
									maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
								}}
								placeholder='Введите username...'
							/>
						</Group>
						<Group className='group-str'>
							<CustomInput
								label='Фамилия'
								name='surname'
								register={register}
								error={errors.surname?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
									maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
								}}
								placeholder='Введите фамилию...'
							/>
						</Group>
						<Group className='group-str'>
							<CustomInput
								label='Имя'
								name='name'
								register={register}
								error={errors.name?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
									maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
								}}
								placeholder='Введите имя...'
							/>
						</Group>
						<Group className='group-str'>
							<CustomInput
								label='Отчество'
								name='patronymic'
								register={register}
								error={errors.patronymic?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
									maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
								}}
								placeholder='Введите отчество...'
							/>
						</Group>
						<Group className='group-str'>
							<CustomInput
								label='Должность'
								name='position'
								register={register}
								error={errors.position?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
									maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
								}}
								placeholder='Введите отчество...'
							/>
						</Group>
						<Group className='group-str'>
							<CustomInput
								label='Email'
								name='email'
								register={register}
								error={errors.email?.message}
								validation={{
									required: {value: true, message: 'Поле является обязательным!'},
									minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
									maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
								}}
								placeholder='Введите email...'
							/>
						</Group>
						<Group className='group-row group-center'>
							<CustomInput
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
