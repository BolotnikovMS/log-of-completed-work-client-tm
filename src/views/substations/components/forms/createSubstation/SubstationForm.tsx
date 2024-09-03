import { yupResolver } from '@hookform/resolvers/yup'
import { type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group, Input, Loader, SelectWrapper } from '../../../../../components'
import { useChannelTypes, useCreateSubstation, useDistricts, useGsmOperators, useHeadControllers, useTypesKp, useUpdateSubstation, useVoltageClasses } from '../../../../../hooks'
import { IPropsMutation } from '../../../../../interfaces'
import { validationSchema } from './substation.validation'
import { IPropsSubstationForm, ISubstationFields } from './substationForm.interface'

const SubstationForm: FC<IPropsSubstationForm> = ({ substation, isEdited, setIsEdited, toggleModal }) => {
  const { id } = useParams()
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<ISubstationFields>({
    mode: 'onBlur',
    defaultValues: {
      districtId: substation?.districtId || (id ? +id : undefined),
      voltageClassesId: substation?.voltageClassesId,
      active: substation?.active,
      rdu: substation?.rdu,
      additionalChannelId: substation?.additionalChannelId || null,
      backupChannelId: substation?.backupChannelId || null,
      backupChannelIp: substation?.backupChannelIp,
      gsmId: substation?.gsmId || null,
      headControllerId: substation?.headControllerId,
      mainChannelId: substation?.mainChannelId,
      mainChannelIp: substation?.mainChannelIp,
      name: substation?.name,
      typeKpId: substation?.typeKpId,
    },
    resolver: yupResolver(validationSchema)
  })
  const { field: { value: districtValue, onChange: districtOnChange, ...restDistrictField } } = useController({ name: 'districtId', control })
  const { field: { value: voltageClassValue, onChange: voltageClassOnChange, ...restVoltageClass } } = useController({ name: 'voltageClassesId', control })
  const { field: { value: typeKpValue, onChange: typeKpOnChange, ...restTypeKp } } = useController({ name: 'typeKpId', control })
  const { field: { value: headControllerValue, onChange: headControllerOnChange, ...restHeadController } } = useController({ name: 'headControllerId', control })
  const { field: { value: gsmOperatorValue, onChange: gsmOperatorOnChange, ...restGsmOperator } } = useController({ name: 'gsmId', control })
  const { field: { value: mainChannelTypeValue, onChange: mainChannelTypeOnChange, ...restMainChannelType } } = useController({ name: 'mainChannelId', control })
  const { field: { value: backupChannelTypeValue, onChange: backupChannelTypeOnChange, ...restBackupChannelType } } = useController({ name: 'backupChannelId', control })
  const { field: { value: additionalChannelTypeValue, onChange: additionalChannelTypeOnChange, ...restAdditionalChannelType } } = useController({ name: 'additionalChannelId', control })
  const { districts, isLoading: isLoadingDistricts, isError: isErrorDistricts } = useDistricts({})
  const { voltageClasses, isError: isErrorVoltageClasses, isLoading: isLoadingVoltageClasses } = useVoltageClasses()
  const { typesKp, isError: isErrorTypesKp, isLoading: isLoadingTypesKp } = useTypesKp({})
  const { headControllers, isError: isErrorHeadControllers, isLoading: isLoadingHeadControllers } = useHeadControllers()
  const { data: gsmOperators, isError: isErrorGsmOperators, isLoading: isLoadingGsmOperators } = useGsmOperators()
  const { data: channelTypes, isError: isErrorChannelTypes, isLoading: isLoadingChannelTypes } = useChannelTypes()
  const { mutateAsync: createSubstation, isError: isErrorCreate, error: errorCreate, isPending: isPendingCreate } = useCreateSubstation()
  const { mutateAsync: updateSubstation, isError: isErrorUpdate, error: errorUpdate, isPending: isPendingUpdate } = useUpdateSubstation()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<ISubstationFields>) => {
    await mutateFn(id ? { id, data } : data)

    reset()
    toggleModal()
    if (isEdited && setIsEdited) setIsEdited(false)
  }
  const submitCreate: SubmitHandler<ISubstationFields> = data => handleMutation({ data, mutateFn: createSubstation })
  const submitUpdate: SubmitHandler<ISubstationFields> = data => {
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
            label='Название ПС'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
            mandatory
            placeholder='Введите название ПС...'
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
          <SelectWrapper label='Выберите основной канал' errorMessage={errors.mainChannelId?.message} mandatory>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={channelTypes?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={mainChannelTypeValue ? channelTypes?.data.find(mC => mC.id === mainChannelTypeValue) : null}
              onChange={option => mainChannelTypeOnChange(option ? option.id : option)}
              isLoading={isLoadingChannelTypes}
              isDisabled={isErrorChannelTypes}
              isClearable
              placeholder="Выберите основной канал..."
              {...restMainChannelType}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <SelectWrapper label='Выберите резервный канал' mandatory errorMessage={errors.backupChannelId?.message}>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={channelTypes?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={backupChannelTypeValue ? channelTypes?.data.find(bC => bC.id === backupChannelTypeValue) : null}
              onChange={option => backupChannelTypeOnChange(option ? option.id : option)}
              isLoading={isLoadingChannelTypes}
              isDisabled={isErrorChannelTypes}
              isClearable
              placeholder="Выберите резервный канал..."
              {...restBackupChannelType}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <SelectWrapper label='Выберите дополнительный канал' mandatory errorMessage={errors.additionalChannelId?.message}>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={channelTypes?.data}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={additionalChannelTypeValue ? channelTypes?.data.find(aC => aC.id === additionalChannelTypeValue) : null}
              onChange={option => additionalChannelTypeOnChange(option ? option.id : option)}
              isLoading={isLoadingChannelTypes}
              isDisabled={isErrorChannelTypes}
              isClearable
              placeholder="Выберите дополнительный канал..."
              {...restAdditionalChannelType}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <SelectWrapper label='Выберите GSM оператора' mandatory errorMessage={errors.gsmId?.message}>
            <AsyncSelect
              classNamePrefix='form__custom-select'
              options={gsmOperators}
              getOptionValue={option => option.id.toString()}
              getOptionLabel={option => option.name}
              value={gsmOperatorValue ? gsmOperators?.find(g => g.id === gsmOperatorValue) : null}
              onChange={option => gsmOperatorOnChange(option ? option.id : option)}
              isLoading={isLoadingGsmOperators}
              isDisabled={isErrorGsmOperators}
              isClearable
              placeholder="Выберите GSM оператора..."
              {...restGsmOperator}
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
        <Group>
          <Input
            label='ip основного канала'
            name='mainChannelIp'
            register={register}
            errorMessage={errors.mainChannelIp?.message}
            placeholder='Введите ip основного канала...'
          />
        </Group>
        <Group>
          <Input
            label='ip резервного канала'
            name='backupChannelIp'
            register={register}
            errorMessage={errors.backupChannelIp?.message}
            placeholder='Введите ip резервного канала...'
          />
        </Group>
        <Group className='!items-center !justify-center'>
          <Input
            classWrapper='!flex-row !items-center'
            label='РДУ'
            name='rdu'
            type='checkbox'
            register={register}
          />
        </Group>
        <Group className='!items-center !justify-center'>
          <Input
            classWrapper='!flex-row !items-center'
            label='Используется?'
            name='active'
            type='checkbox'
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
