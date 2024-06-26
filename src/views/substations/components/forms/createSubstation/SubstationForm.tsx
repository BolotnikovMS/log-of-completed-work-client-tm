import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader, SelectWrapper } from '../../../../../components'
import { useChannelTypes, useDistricts, useGsmOperators, useHeadControllers, useTypesKp, useVoltageClasses } from '../../../../../hooks'
import { IPropsSubstationForm, ISubstationFields } from './substationForm.interface'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError, isAxiosError } from 'axios'
import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { toast } from 'react-toastify'
import { SubstationService } from '../../../../../services/substations/substation.service'
import { TSubstationData } from '../../../../../services/substations/substation.type'
import { validationSchema } from './substation.validation'

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
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TSubstationData) => SubstationService.update({ id: substation!.id, data }) : (data: TSubstationData) => SubstationService.create(data),
    onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['substation'] })
      await queryClient.invalidateQueries({ queryKey: ['substations'] })
      await queryClient.invalidateQueries({ queryKey: ['district-substations'] })

      if (substation !== undefined && substation !== null && setIsEdited) {
        setIsEdited(false)
        toast.success('Запись успешно обновлена!')
      } else {
        toast.success('Запись успешно добавлена!')
      }
      reset()
      toggleModal()
    },
    onError: (errors) => {
      if (isAxiosError(errors)) {
        if (Array.isArray(errors.response?.data)) {
          errors.response?.data.map((errData: AxiosError) => {
            toast.error(errData.message)
          })
        }
      }
    }
  })

  const submit: SubmitHandler<ISubstationFields> = data => mutateAsync(data)

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
                <Group className='group-col group-str'>
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
                <Group className='group-col group-str'>
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
                <Group className='group-col group-str'>
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
                <Group className='group-col group-str'>
									<SelectWrapper label='Выберите резервный канал'>
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
                <Group className='group-col group-str'>
									<SelectWrapper label='Выберите дополнительный канал'>
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
                <Group className='group-col group-str'>
									<SelectWrapper label='Выберите GSM оператора'>
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
                <Group className='group-col group-str'>
                  <CustomInput
                    label='Название ПС'
                    name='name'
                    register={register}
                    errorMessage={errors.name?.message}
										mandatory
                    placeholder='Введите название ПС...'
                  />
                </Group>
                <Group className='group-col group-str'>
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
                <Group className='group-col group-str'>
                  <CustomInput
                    label='ip основного канала'
                    name='mainChannelIp'
                    register={register}
                    errorMessage={errors.mainChannelIp?.message}
                    placeholder='Введите ip основного канала...'
                  />
                </Group>
                <Group className='group-col group-str'>
                  <CustomInput
                    label='ip резервного канала'
                    name='backupChannelIp'
                    register={register}
                    errorMessage={errors.backupChannelIp?.message}
                    placeholder='Введите ip резервного канала...'
                  />
                </Group>
                <Group className='group-col'>
                  <CustomInput
										className='custom-input-wrapper-row'
                    label='РДУ'
                    name='rdu'
                    type='checkbox'
                    register={register}
                  />
                </Group>
                <Group>
                  <CustomInput
										className='custom-input-wrapper-row'
                    label='Используется?'
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
          )}
      </div>
    </>
  )
}

export default SubstationForm
// 301