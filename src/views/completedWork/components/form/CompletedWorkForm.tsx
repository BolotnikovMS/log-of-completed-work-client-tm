import { yupResolver } from '@hookform/resolvers/yup'
import ru from 'date-fns/locale/ru'
import moment from 'moment'
import { type FC } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { default as AsyncSelect } from 'react-select'
import { Button, Checkbox, CustomDatePicker, Error, Group, Icon, Loader, SelectWrapper, Textarea } from '../../../../components'
import { useCreateCompletedWork, useTypesWork, useUpdateCompletedWork, useUsers } from '../../../../hooks'
import { useSubstations } from '../../../../hooks/substations/useSubstations'
import { ICompletedWork, IPropsForm, IPropsMutation } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import { TCompletedWorkData } from '../../../../types'
import { validationSchema } from './completedWork.validation'

const CompletedWorkForm: FC<IPropsForm<ICompletedWork>> = ({ data: completedWork, isEdited, setIsEdited, toggleModal }) => {
	const [searchParams] = useSearchParams()
	const { authUser } = useAuthStore()
	const substationId = searchParams.get('substation')
	const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<TCompletedWorkData>({
		mode: 'all',
		defaultValues: {
			substationId: completedWork?.substationId || (substationId ? +substationId : undefined),
			workProducerId: completedWork?.workProducerId || authUser?.id,
			typeWorkId: completedWork?.typeWorkId,
			description: completedWork?.description,
			note: completedWork?.note,
			dateCompletion: completedWork ? new Date(completedWork?.dateCompletion) : undefined,
			inControl: completedWork?.inControl,
		},
		resolver: yupResolver(validationSchema),
	})
	const { field: { value: substationValue, onChange: substationOnChange, ...restSubstationField } } = useController({ name: 'substationId', control })
	const { field: { value: userValue, onChange: userOnChange, ...restUserField } } = useController({ name: 'workProducerId', control })
	const { field: { value: dateCompletionValue, onChange: dateCompletionOnChange, ...restDateCompletion } } = useController({ name: 'dateCompletion', control })
	const { field: { value: typeWorkValue, onChange: typeWorkOnChange, ...restTypeWorkField } } = useController({ name: 'typeWorkId', control })
	const { substations, isError: isErrorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
	const { data: users, isError: isErrorUsers, isLoading: isLoadingUsers } = useUsers({ cleanUser: true })
	const { data: typesWork, isError: isErrorTypesWork, isLoading: isLoadingTypesWork } = useTypesWork({})
	const { mutateAsync: createCompletedWork, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateCompletedWork()
	const { mutateAsync: updateCompletedWork, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateCompletedWork()
	const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TCompletedWorkData>) => {
		const transformDate = { ...data, dateCompletion: moment(data.dateCompletion).format('YYYY-MM-DD') }

		await mutateFn(id ? { id, data: transformDate } : { ...data, dateCompletion: moment(data.dateCompletion).format('YYYY-MM-DD') })

		reset()
		toggleModal()
		if (isEdited && setIsEdited) setIsEdited(false)
	}
	const submitCreate: SubmitHandler<TCompletedWorkData> = data => handleMutation({ data, mutateFn: createCompletedWork })
	const submitUpdate: SubmitHandler<TCompletedWorkData> = data => {
		if (!completedWork?.id) return null

		handleMutation({ data, mutateFn: updateCompletedWork, id: completedWork.id })
	}
	const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

	if (isPendingCreate || isPendingUpdate) return <Loader />

	return (
		<div className="work-log__form">
			{errorMessage}
			<form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
				<Group>
					<SelectWrapper label='Выберите объект' errorMessage={errors.substationId?.message} mandatory>
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
							placeholder="Выберите объект..."
							{...restSubstationField}
						/>
					</SelectWrapper>
				</Group>
				<Group>
					<SelectWrapper label='Исполнитель работ' errorMessage={errors.workProducerId?.message} mandatory>
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
					</SelectWrapper>
				</Group>
				<Group>
					<SelectWrapper label='Категория работ' errorMessage={errors.typeWorkId?.message} mandatory>
						<AsyncSelect
							classNamePrefix='form__custom-select'
							options={typesWork?.data}
							getOptionValue={option => option.id.toString()}
							getOptionLabel={option => option.name}
							value={typeWorkValue || completedWork ? typesWork?.data?.find(tW => tW.id === typeWorkValue) : null}
							onChange={option => typeWorkOnChange(option ? option.id : option)}
							isLoading={isLoadingTypesWork}
							isDisabled={isErrorTypesWork}
							isClearable
							placeholder="Выберите категорию..."
							{...restTypeWorkField}
						/>
					</SelectWrapper>
				</Group>
				<Group>
					<Textarea
						label='Описание'
						name='description'
						register={register}
						error={errors.description?.message}
						mandatory={true}
						placeholder='Введите описание...'
					/>
				</Group>
				<Group>
					<Textarea
						label='Примечание'
						name='note'
						register={register}
						className='!h-28'
						error={errors.note?.message}
						placeholder='Введите примечание...'
					/>
				</Group>
				<Group className='mt-4'>
					<CustomDatePicker
						register={register}
						errorMessage={errors.dateCompletion?.message}
						dateFormat='dd.MM.yyyy'
						locale={ru}
						selected={dateCompletionValue}
						onChange={(dateCompletionValue) => dateCompletionOnChange(dateCompletionValue)}
						placeholderText='Укажите дату работ'
						iconLeft={<Icon id='calendar' className='!w-6 !h-6' />}
						autoComplete='off'
						{...restDateCompletion}
					/>
				</Group>
				<Group className='!items-center !justify-center'>
					<Checkbox
						name='inControl'
						textLabel='Контроль'
						classLabel='!flex-row'
						aria-label='Контроль'
						register={register}
					/>
				</Group>
				<div className="form__btns">
					<Button disabled={!isValid} className='mBtn_outline-green'>
						{isEdited ? 'Сохранить' : 'Добавить'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default CompletedWorkForm
