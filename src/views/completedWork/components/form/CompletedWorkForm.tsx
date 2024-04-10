import { useMutation, useQueryClient } from '@tanstack/react-query'
import ru from 'date-fns/locale/ru'
import { type FC } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select'
import { toast } from 'react-toastify'
import { Button, Error, FormGroup, Loader, Textarea } from '../../../../components'
import { errorHandler } from '../../../../helpers/errorHandler.helper'
import { useUsers } from '../../../../hooks'
import { useSubstations } from '../../../../hooks/substations/useSubstations'
import { CompletedWorkService } from '../../../../services/completed-work/completed-work.service'
import { TCompletedWorkData } from '../../../../services/completed-work/completed-work.type'
import { ICompletedWorkFields, IPropsCompletedWorkForm } from './completedForm.interface'

const CompletedWorkForm: FC<IPropsCompletedWorkForm> = ({ completedWork, isEdited, setIsEdited, toggleModal }) => {
	const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<ICompletedWorkFields>({
		mode: 'onBlur',
		defaultValues: {
			substationId: completedWork?.substation.id,
			workProducerId: completedWork?.work_producer.id,
			description: completedWork?.description,
			note: completedWork?.note,
			dateCompletion: completedWork ? new Date(completedWork?.dateCompletion) : undefined
		}
	})
	const queryClient = useQueryClient()
	const { field: {value: substationValue, onChange: substationOnChange, ...restSubstationField} } = useController({ name: 'substationId', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
	const { field: {value: userValue, onChange: userOnChange, ...restUserField} } = useController({ name: 'workProducerId', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
	const { field: {value: dateCompletionValue, onChange: dateCompletionOnChange, ...restDateCompletion} } = useController({ name: 'dateCompletion', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
	const { substations, isError: isErrorSubstations, isLoading: isLoadingSubstations } = useSubstations()
	const { data: users, isError: isErrorUsers, isLoading: isLoadingUsers } = useUsers()
	const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
		mutationFn: isEdited ? (data: TCompletedWorkData) => CompletedWorkService.update({id: completedWork!.id, data}) : (data: TCompletedWorkData) => CompletedWorkService.create(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: ['completedWork', 'infinity']})

			if (completedWork !== undefined && completedWork !== null && setIsEdited) {
				setIsEdited(false)
				toast.success('Запись успешно обновлена!')
			} else {
				toast.success('Запись успешно добавлена!')
			}
			reset()
			toggleModal()
		},
		onError: (errors) => {
			toast.error(errorHandler(errors))
		}
	})

	const submit: SubmitHandler<ICompletedWorkFields> = data => mutateAsync({...data, dateCompletion: data.dateCompletion.toLocaleDateString()})

	return (
		<>
			<div className="work-log__form">
				{(isErrorMutate) && <Error error={errorMutate} />}
				{isPending ?
					(<Loader />)
        : (
					<form className="form form-col" onSubmit={handleSubmit(submit)}>
						<div className="form__content form__content-mt form__content-col">
							<FormGroup>
								<label htmlFor="label">Выберите ПС</label>
								<AsyncSelect
									classNamePrefix='form__custom-select'
									options={substations?.data}
									getOptionValue={option => option.id.toString()}
									getOptionLabel={option => option.fullNameSubstation}
									value={substationValue || completedWork ? substations?.data.find(d => d.id === substationValue || d.id === completedWork?.substation.id) : null}
									onChange={option => substationOnChange(option ? option.id : option)}
									isLoading={isLoadingSubstations}
									isDisabled={isErrorSubstations}
									isClearable
									placeholder="Выберите ПС..."
									{...restSubstationField}
								/>
							</FormGroup>
							<FormGroup>
								<label htmlFor="label">Исполнитель работ</label>
								<AsyncSelect
									classNamePrefix='form__custom-select'
									options={users}
									getOptionValue={option => option.id.toString()}
									getOptionLabel={option => option.fullName}
									value={userValue || completedWork ? users?.find(d => d.id === userValue || d.id === completedWork?.work_producer.id) : null}
									onChange={option => userOnChange(option ? option.id : option)}
									isLoading={isLoadingUsers}
									isDisabled={isErrorUsers}
									isClearable
									placeholder="Выберите исполнителя..."
									{...restUserField}
								/>
							</FormGroup>
							<FormGroup>
								<Textarea
									label='Описание'
									name='description'
									register={register}
									error={errors.description?.message}
									validation={{
										required: {value: true, message: 'Поле является обязательным!'},
										minLength: {value: 5, message: 'Минимальная длина поля 5 символа!'},
										maxLength: {value: 1000, message: 'Максимальная длина поля 1000 символов!'}
									}}
									placeholder='Введите описание...'
								/>
							</FormGroup>
							<FormGroup>
								<Textarea
									label='Примечание'
									name='note'
									register={register}
									error={errors.note?.message}
									validation={{
										minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
										maxLength: {value: 700, message: 'Максимальная длина поля 700 символов!'}
									}}
									placeholder='Введите примечание...'
								/>
							</FormGroup>
							<FormGroup>
								<DatePicker
									className='form__input'
									dateFormat='dd.MM.yyyy'
									showIcon
									locale={ru}
									selected={dateCompletionValue}
									onChange={(dateCompletionValue) => dateCompletionOnChange(dateCompletionValue)}
									placeholderText='Укажите дату работ'
									{...restDateCompletion}
								/>
							</FormGroup>
						</div>
						<div className="form__btns">
							<Button disabled={!isValid} classBtn='btn-bg_green'>
								{isEdited ? 'Сохранить' : 'Добавить'}
							</Button>
						</div>
					</form>
				)}
			</div>
		</>
	)
}

export default CompletedWorkForm