import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Checkbox, Error, Group, Input, Loader, SelectWrapper } from '../../../../../components'
import { useCreateSubstation, useDistricts, useHeadControllers, useTypesKp, useUpdateSubstation, useVoltageClasses } from '../../../../../hooks'
import { IPropsForm, IPropsMutation, ISubstation } from '../../../../../interfaces'
import { TSubstationData } from '../../../../../types'
import { validationSchema } from './substation.validation'

const SubstationForm: FC<IPropsForm<ISubstation>> = ({ data: substation, isEdited, setIsEdited, toggleModal }) => {
  const { id } = useParams()
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<TSubstationData>({
    mode: 'all',
    defaultValues: {
      districtId: substation?.districtId || (id ? +id : undefined),
      voltageClassesId: substation?.voltageClassesId,
      active: substation?.active,
      rdu: substation?.rdu,
      headControllerId: substation?.headControllerId,
      name: substation?.name,
      typeKpId: substation?.typeKpId,
    },
    resolver: yupResolver(validationSchema)
  })
  const { field: { value: districtValue, onChange: districtOnChange, ...restDistrictField } } = useController({ name: 'districtId', control })
  const { field: { value: voltageClassValue, onChange: voltageClassOnChange, ...restVoltageClass } } = useController({ name: 'voltageClassesId', control })
  const { field: { value: typeKpValue, onChange: typeKpOnChange, ...restTypeKp } } = useController({ name: 'typeKpId', control })
  const { field: { value: headControllerValue, onChange: headControllerOnChange, ...restHeadController } } = useController({ name: 'headControllerId', control })
  const { districts, isLoading: isLoadingDistricts, isError: isErrorDistricts } = useDistricts({})
  const { voltageClasses, isError: isErrorVoltageClasses, isLoading: isLoadingVoltageClasses } = useVoltageClasses({})
  const { typesKp, isError: isErrorTypesKp, isLoading: isLoadingTypesKp } = useTypesKp({})
  const { headControllers, isError: isErrorHeadControllers, isLoading: isLoadingHeadControllers } = useHeadControllers({})
  const { mutateAsync: createSubstation, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateSubstation()
  const { mutateAsync: updateSubstation, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateSubstation()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TSubstationData>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<TSubstationData> = data => handleMutation({ data, mutateFn: createSubstation })
  const submitUpdate: SubmitHandler<TSubstationData> = data => {
    if (!substation?.id) return null

    handleMutation({ data, mutateFn: updateSubstation, id: substation.id })
  }
  const errorMessage = (isErrorCreate || isErrorUpdate && errorCreate && errorUpdate !== null) && <Error error={errorCreate || errorUpdate} />

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <div className="work-log__form">
      {errorMessage}
      <form className="form" onSubmit={handleSubmit(isEdited ? submitUpdate : submitCreate)}>
        <Group>
          <SelectWrapper label='Выберите РЭС или ГП' errorMessage={errors.districtId?.message} mandatory>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={districts?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={districtValue ? districts?.data.find(d => d.id === districtValue) : null}
              onChange={option => districtOnChange(option ? option.id : option)}
              isLoading={isLoadingDistricts}
              isDisabled={isErrorDistricts}
              isClearable
              placeholder="Выберите РЭС или ГП..."
              {...restDistrictField}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <Input
            label='Название объекта'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory
            placeholder='Введите название объекта...'
          />
        </Group>
        <Group>
          <SelectWrapper label='Выберите КП' errorMessage={errors.typeKpId?.message} mandatory>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={typesKp?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={typeKpValue ? typesKp?.data.find(t => t.id === typeKpValue) : null}
              onChange={option => typeKpOnChange(option ? option.id : option)}
              isLoading={isLoadingTypesKp}
              isDisabled={isErrorTypesKp}
              isClearable
              placeholder="Выберите КП..."
              {...restTypeKp}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <SelectWrapper label='Выберите головной контроллер' errorMessage={errors.headControllerId?.message} mandatory>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={headControllers?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={headControllerValue ? headControllers?.data.find(h => h.id === headControllerValue) : null}
              onChange={option => headControllerOnChange(option ? option.id : option)}
              isLoading={isLoadingHeadControllers}
              isDisabled={isErrorHeadControllers}
              isClearable
              placeholder="Выберите головной контроллер..."
              {...restHeadController}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <SelectWrapper label='Выберите класс U' errorMessage={errors.voltageClassesId?.message} mandatory>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={voltageClasses?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={voltageClassValue ? voltageClasses?.data.find(v => v.id === voltageClassValue) : null}
              onChange={option => voltageClassOnChange(option ? option.id : option)}
              isLoading={isLoadingVoltageClasses}
              isDisabled={isErrorVoltageClasses}
              isClearable
              placeholder="Выберите класс U..."
              {...restVoltageClass}
            />
          </SelectWrapper>
        </Group>
        <Group className='!items-center !justify-center'>
					<Checkbox 
						name='rdu'
						textLabel='РДУ'
						classLabel='!flex-row'
						aria-label='РДУ'
            register={register}
					/>
        </Group>
        <Group className='!items-center !justify-center'>
					<Checkbox 
						name='active'
						textLabel='Используется?'
						classLabel='!flex-row'
						aria-label='РДУ'
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

export default SubstationForm
