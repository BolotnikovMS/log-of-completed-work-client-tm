import { useMutation, useQueryClient } from '@tanstack/react-query'
import ru from 'date-fns/locale/ru'
import { Calendar } from 'lucide-react'
import moment from 'moment'
import { type FC } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { default as AsyncSelect } from 'react-select'
import { toast } from 'react-toastify'
import { Button, CustomDatePicker, Error, Group, Loader, Textarea, ValidationMessage } from '../../../../components'
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
	const { substations, isError: isErrorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
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

	const submit: SubmitHandler<ICompletedWorkFields> = data => mutateAsync({...data, dateCompletion: moment(data.dateCompletion).format('MM/DD/YYYY')})

	return (
		<>
			<div className="work-log__form">
				{(isErrorMutate) && <Error error={errorMutate} />}
				{isPending ?
					(<Loader />)
        : (
					<form className="form form-col" onSubmit={handleSubmit(submit)}>
						<div className="form__content form__content-w-55 form__content-mt">
							<Group className='group-col group-str'>
								<div className="custom-select-wrapper">
									<label htmlFor="label" className='label'>
										<span className="label__text">
											Выберите ПС
											<span className='text-mandatory'>*</span>
										</span>
									</label>
									<AsyncSelect
										classNamePrefix='form__custom-select'
										options={substations?.data}
										getOptionValue={option => option.id.toString()}
										getOptionLabel={option => option.fullNameSubstation}
										value={substationValue || completedWork ? substations?.data.find(d => d.id === substationValue) : null}
										onChange={option => substationOnChange(option?.id)}
										isLoading={isLoadingSubstations}
										isDisabled={isErrorSubstations}
										isClearable
										placeholder="Выберите ПС..."
										{...restSubstationField}
									/>
									{errors.substationId && <ValidationMessage className='error-bottom-23' children={errors.substationId?.message} />}
								</div>
							</Group>
							<Group className='group-col group-str'>
								<div className="custom-select-wrapper">
									<label htmlFor="label" className='label'>
										<span className="label__text">
											Исполнитель работ
											<span className='text-mandatory'>*</span>
										</span>
									</label>
									<AsyncSelect
										classNamePrefix='form__custom-select'
										options={users?.data}
										getOptionValue={option => option.id.toString()}
										getOptionLabel={option => option.fullName}
										value={userValue || completedWork ? users?.data?.find(d => d.id === userValue) : null}
										onChange={option => userOnChange(option ? option.id : option)}
										isLoading={isLoadingUsers}
										isDisabled={isErrorUsers}
										isClearable
										placeholder="Выберите исполнителя..."
										{...restUserField}
									/>
									{errors.workProducerId && <ValidationMessage className='error-bottom-23' children={errors.workProducerId?.message} />}
								</div>
							</Group>
							<Group className='group-col group-str'>
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
									mandatory={true}
									placeholder='Введите описание...'
								/>
							</Group>
							<Group className='group-col group-str'>
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
							</Group>
							<Group className='group-col group-str'>
								<CustomDatePicker
									register={register}
									errorMessage={errors.dateCompletion?.message}
									dateFormat='dd.MM.yyyy'
									locale={ru}
									selected={dateCompletionValue}
									onChange={(dateCompletionValue) => dateCompletionOnChange(dateCompletionValue)}
									placeholderText='Укажите дату работ'
									iconLeft={<Calendar />}
									{...restDateCompletion}
								/>
							</Group>
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