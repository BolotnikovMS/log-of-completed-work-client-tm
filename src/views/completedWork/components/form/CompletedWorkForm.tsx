import { yupResolver } from '@hookform/resolvers/yup'
import ru from 'date-fns/locale/ru'
import { Calendar } from 'lucide-react'
import moment from 'moment'
import { type FC } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { default as AsyncSelect } from 'react-select'
import { Button, CustomDatePicker, Error, Group, Loader, SelectWrapper, Textarea } from '../../../../components'
import { useCreateCompletedWork, useUpdateCompletedWork, useUsers } from '../../../../hooks'
import { useSubstations } from '../../../../hooks/substations/useSubstations'
import { IPropsMutation } from '../../../../interfaces'
import { ICompletedWorkFields, IPropsCompletedWorkForm } from './completedForm.interface'
import { validationSchema } from './completedWork.validation'

const CompletedWorkForm: FC<IPropsCompletedWorkForm> = ({ completedWork, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<ICompletedWorkFields>({
    mode: 'onBlur',
    defaultValues: {
      substationId: completedWork?.substation?.id,
      workProducerId: completedWork?.work_producer?.id,
      description: completedWork?.description,
      note: completedWork?.note,
      dateCompletion: completedWork ? new Date(completedWork?.dateCompletion) : undefined
    },
    resolver: yupResolver(validationSchema),
  })
  const { field: { value: substationValue, onChange: substationOnChange, ...restSubstationField } } = useController({ name: 'substationId', control })
  const { field: { value: userValue, onChange: userOnChange, ...restUserField } } = useController({ name: 'workProducerId', control })
  const { field: { value: dateCompletionValue, onChange: dateCompletionOnChange, ...restDateCompletion } } = useController({ name: 'dateCompletion', control })
  const { substations, isError: isErrorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
  const { data: users, isError: isErrorUsers, isLoading: isLoadingUsers } = useUsers({ cleanUser: true })
  const { mutateAsync: createCompletedWork, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateCompletedWork()
  const { mutateAsync: updateCompletedWork, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateCompletedWork()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<ICompletedWorkFields>) => {
    const transformDate = { ...data, dateCompletion: moment(data.dateCompletion).format('MM/DD/YYYY') }

    await mutateFn(id ? { id, data: transformDate } : { ...data, dateCompletion: moment(data.dateCompletion).format('MM/DD/YYYY') })

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<ICompletedWorkFields> = data => handleMutation({ data, mutateFn: createCompletedWork })
  const submitUpdate: SubmitHandler<ICompletedWorkFields> = data => {
    if (!completedWork?.id) return null

    handleMutation({ data, mutateFn: updateCompletedWork, id: completedWork.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  return (
    <div className="work-log__form">
      {errorMessage}
      {isPendingCreate || isPendingUpdate ?
        (<Loader />)
        : (
          <form className="form form-col" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
            <div className="form__content form__content-w-55 form__content-mt">
              <Group className='group-col group-str'>
                <SelectWrapper label='Выберите ПС' errorMessage={errors.substationId?.message} mandatory>
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
                </SelectWrapper>
              </Group>
              <Group className='group-col group-str'>
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
              <Group className='group-col group-str'>
                <Textarea
                  label='Описание'
                  name='description'
                  register={register}
                  error={errors.description?.message}
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
                  autoComplete='off'
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
  )
}

export default CompletedWorkForm
