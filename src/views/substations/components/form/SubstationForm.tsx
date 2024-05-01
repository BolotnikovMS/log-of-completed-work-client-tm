import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { Button, CustomInput, Error, Group, Loader } from '../../../../components'
import { useChannelTypes, useDistricts, useGsmOperators, useHeadControllers, useTypesKp, useVoltageClasses } from '../../../../hooks'
import { IPropsSubstationForm, ISubstationFields } from './substationForm.interface'

import { AxiosError, isAxiosError } from 'axios'
import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { toast } from 'react-toastify'
import { SubstationService } from '../../../../services/substations/substation.service'
import { TSubstationData } from '../../../../services/substations/substation.type'

const SubstationForm: FC<IPropsSubstationForm> = ({ substation, isEdited, setIsEdited, toggleModal }) => {
  const { id } = useParams()
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<ISubstationFields>({
    mode: 'onBlur',
    defaultValues: {
      districtId: substation?.districtId || (typeof id !== "undefined" && id ? +id : undefined),
      voltageClassesId: substation?.voltageClassesId,
      active: substation?.active,
      rdu: substation?.rdu,
      additionalChannelId: substation?.additionalChannelId,
      backupChannelId: substation?.backupChannelId,
      backupChannelIp: substation?.backupChannelIp,
      gsmId: substation?.gsmId,
      headControllerId: substation?.headControllerId,
      mainChannelId: substation?.mainChannelId,
      mainChannelIp: substation?.mainChannelIp,
      name: substation?.name,
      typeKpId: substation?.typeKpId,
    }
  })
  const { field: { value: districtValue, onChange: districtOnChange, ...restDistrictField } } = useController({ name: 'districtId', control, rules: { required: { value: true, message: 'Поле является обязательным!' } } })
  const { field: { value: voltageClassValue, onChange: voltageClassOnChange, ...restVoltageClass } } = useController({ name: 'voltageClassesId', control, rules: { required: { value: true, message: 'Поле является обязательным!' } } })
  const { field: { value: typeKpValue, onChange: typeKpOnChange, ...restTypeKp } } = useController({ name: 'typeKpId', control, rules: { required: { value: true, message: 'Поле является обязательным!' } } })
  const { field: { value: headControllerValue, onChange: headControllerOnChange, ...restHeadController } } = useController({ name: 'headControllerId', control, rules: { required: { value: true, message: 'Поле является обязательным!' } } })
  const { field: { value: gsmOperatorValue, onChange: gsmOperatorOnChange, ...restGsmOperator } } = useController({ name: 'gsmId', control, rules: { required: false } })
  const { field: { value: mainChannelTypeValue, onChange: mainChannelTypeOnChange, ...restMainChannelType } } = useController({ name: 'mainChannelId', control, rules: { required: { value: true, message: 'Поле является обязательным!' } } })
  const { field: { value: backupChannelTypeValue, onChange: backupChannelTypeOnChange, ...restBackupChannelType } } = useController({ name: 'backupChannelId', control, rules: { required: false } })
  const { field: { value: additionalChannelTypeValue, onChange: additionalChannelTypeOnChange, ...restAdditionalChannelType } } = useController({ name: 'additionalChannelId', control, rules: { required: false } })
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
                  <label className='label'>Выберите РЭС или ГП</label>
                  <AsyncSelect
                    classNamePrefix='form__custom-select'
                    options={districts?.data}
                    getOptionValue={option => option.id.toString()}
                    getOptionLabel={option => option.name}
                    value={
                      districtValue || substation ?
                        districts?.data.find(d => d.id === districtValue || d.id === substation?.districtId)
                        :
                        // id !== undefined ? districts?.data.find(d => d.id === +id) : null
                        null
                    }
                    onChange={option => districtOnChange(option ? option.id : option)}
                    isLoading={isLoadingDistricts}
                    isDisabled={isErrorDistricts}
                    isClearable
                    placeholder="Выберите РЭС или ГП..."
                    {...restDistrictField}
                  />
                </Group>
                <Group className='group-col group-str'>
                  <label className='label'>Выберите КП</label>
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
                </Group>
                <Group className='group-col group-str'>
                  <label className='label'>Выберите головной контроллер</label>
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
                </Group>
                <Group className='group-col group-str'>
                  <label className='label'>Выберите основной канал</label>
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
                </Group>
                <Group className='group-col group-str'>
                  <label className='label'>Выберите резервный канал</label>
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
                </Group>
                <Group className='group-col group-str'>
                  <label className='label'>Выберите дополнительный канал</label>
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
                </Group>
                <Group className='group-col group-str'>
                  <label className='label'>Выберите GSM оператора</label>
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
                </Group>
                <Group className='group-col group-str'>
                  <CustomInput
                    label='Название ПС'
                    name='name'
                    register={register}
                    errorMessage={errors.name?.message}
                    validation={{
                      required: { value: true, message: 'Поле является обязательным!' },
                      minLength: { value: 3, message: 'Минимальная длина поля 3 символа!' },
                      maxLength: { value: 200, message: 'Максимальная длина поля 200 символов!' }
                    }}
                    placeholder='Введите название ПС...'
                  />
                </Group>
                <Group className='group-col group-str'>
                  <label className='label'>Выберите класс U</label>
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
                <Group>
                  <CustomInput
                    label='РДУ'
                    name='rdu'
                    type='checkbox'
                    register={register}
                  />
                </Group>
                <Group>
                  <CustomInput
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
