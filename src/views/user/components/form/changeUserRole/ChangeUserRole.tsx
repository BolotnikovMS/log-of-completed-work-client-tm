import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select'
import { Button, Error, Group, SelectWrapper } from '../../../../../components'
import { useRoles } from '../../../../../hooks'
import { useChangeRole } from '../../../../../hooks/users/useChangeRole'
import { IPropsForm, IUser } from '../../../../../interfaces'
import { TChangeUserRole } from '../../../../../types'
import { validationSchema } from './changeUserRole.validation'

const ChangeUserRole: FC<IPropsForm<IUser>> = ({ data: user, toggleModal }) => {
	const { handleSubmit, formState: { errors, isValid }, control } = useForm<TChangeUserRole>({
		mode: 'all',
		defaultValues: {
			roleId: user?.roleId
		},
		resolver: yupResolver(validationSchema),
	})
	const { field: { value: roleValue, onChange: roleChange, ...restRoles } } = useController({ name: 'roleId', control })
	const { roles, error: errorRoles, isError: isErrorRoles, isLoading: isLoadingRoles } = useRoles()
	const { mutateAsync } = useChangeRole(user!.id)
	const submit: SubmitHandler<TChangeUserRole> = data => {
		mutateAsync(data)

		toggleModal()
	}

	const errorMessage = (isErrorRoles) && <Error error={errorRoles!} />

	return (
		<div className="work-log__form !h-full">
			{errorMessage}
			<form className="form justify-between" onSubmit={handleSubmit(submit)}>
				<Group>
					<SelectWrapper label='Выберите роль' errorMessage={errors.roleId?.message} mandatory>
						<AsyncSelect
							classNamePrefix='form__custom-select'
							options={roles}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.name}
							value={roleValue ? roles?.find(r => r.id === +roleValue) : null}
							onChange={option => roleChange(option ? option.id : option)}
							isLoading={isLoadingRoles}
							isDisabled={isErrorRoles}
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
