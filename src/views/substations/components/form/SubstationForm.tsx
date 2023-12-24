import { Button, CustomInput, Error, FormGroup, Loader } from '../../../../components'
import { IPropsSubstationForm, ISubstationFields } from './substationForm.interface'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useChannelTypes, useDistricts, useGsmOperators, useHeadControllers, useTypesKp, useVoltageClasses } from '../../../../hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import AsyncSelect from 'react-select'
import React from 'react'
import { SubstationService } from '../../../../services/substations/substation.service'
import { TSubstationData } from '../../../../services/substations/substation.type'
import { isAxiosError } from 'axios'

export const SubstationForm: React.FC<IPropsSubstationForm> = ({ substation, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<ISubstationFields>({
    mode: 'onBlur'
  })
  const { field: {value: districtValue, onChange: districtOnChange, ...restDistrictField} } = useController({ name: 'districtId', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
  const { field: {value: voltageClassValue, onChange: voltageClassOnChange, ...restVoltageClass} } = useController({name: 'voltageClassesId', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
  const { field: {value: typeKpValue, onChange: typeKpOnChange, ...restTypeKp} } = useController({name: 'typeKpId', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
  const { field: {value: headControllerValue, onChange: headControllerOnChange, ...restHeadController} } = useController({name: 'headControllerId', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
  const { field: {value: gsmOperatorValue, onChange: gsmOperatorOnChange, ...restGsmOperator} } = useController({name: 'gsmId', control, rules: {required: false} })
  const { field: {value: mainChannelTypeValue, onChange: mainChannelTypeOnChange, ...restMainChannelType} } = useController({name: 'mainChannelId', control, rules: {required: {value: true, message: 'Поле является обязательным!'}}})
  const { field: {value: backupChannelTypeValue, onChange: backupChannelTypeOnChange, ...restBackupChannelType} } = useController({name: 'backupChannelId', control, rules: {required: false}})
  const { field: {value: additionalChannelTypeValue, onChange: additionalChannelTypeOnChange, ...restAdditionalChannelType} } = useController({name: 'additionalChannelId', control, rules: {required: false}})
  const { districts, isLoading: isLoadingDistricts, isError: isErrorDistricts } = useDistricts({})
  const { voltageClasses, isError: isErrorVoltageClasses, isLoading: isLoadingVoltageClasses } = useVoltageClasses()
  const { typesKp, isError: isErrorTypesKp, isLoading: isLoadingTypesKp } = useTypesKp({})
  const { headControllers, isError: isErrorHeadControllers, isLoading: isLoadingHeadControllers } = useHeadControllers()
  const { data: gsmOperators, isError: isErrorGsmOperators, isLoading: isLoadingGsmOperators } = useGsmOperators()
  const { data: channelTypes, isError: isErrorChannelTypes, isLoading: isLoadingChannelTypes } = useChannelTypes()
  const queryClient = useQueryClient()
  const { mutateAsync, isError: isErrorMutate, error: errorMutate, isPending } = useMutation({
    mutationFn: isEdited ? (data: TSubstationData) => SubstationService.update({id: substation!.id, data}) : (data: TSubstationData) => SubstationService.create(data),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['substations']})
    }
  })
  
  const submit: SubmitHandler<ISubstationFields> = (data) => {
    if (substation !== undefined && substation !== null && setIsEdited) {
      mutateAsync(data)
      setIsEdited(false)
      toggleModal()
    }
    
    mutateAsync(data)
    reset()
    toggleModal()
  }
  
  return (
    <>
      <div className="work-log__form">
        {(isErrorMutate && isAxiosError(errorMutate)) && <Error error={errorMutate} />}
        {isPending ?
          (<Loader />)
        : (
          <form className="form form-col" onSubmit={handleSubmit(submit)}>
            <div className="form__content form__content-col">
              <FormGroup>
                <label className='label'>Выберите РЭС или ГП</label>
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
              </FormGroup>
              <FormGroup>
                <label className='label'>Выберите КП</label>
                <AsyncSelect
                  classNamePrefix='form__custom-select'
                  options={typesKp?.data}
                  getOptionValue={option => option.id.toString()}
                  getOptionLabel={option => option.name}
                  value={typeKpValue ? typesKp?.data.find(d => d.id === typeKpValue) : null}
                  onChange={option => typeKpOnChange(option ? option.id : option)}
                  isLoading={isLoadingTypesKp}
                  isDisabled={isErrorTypesKp}
                  isClearable
                  placeholder="Выберите КП..."
                  {...restTypeKp}
                />
              </FormGroup>
              <FormGroup>
                <label className='label'>Выберите головной контроллер</label>
                <AsyncSelect
                  classNamePrefix='form__custom-select'
                  options={headControllers?.data}
                  getOptionValue={option => option.id.toString()}
                  getOptionLabel={option => option.name}
                  value={headControllerValue ? headControllers?.data.find(d => d.id === headControllerValue) : null}
                  onChange={option => headControllerOnChange(option ? option.id : option)}
                  isLoading={isLoadingHeadControllers}
                  isDisabled={isErrorHeadControllers}
                  isClearable
                  placeholder="Выберите головной контроллер..."
                  {...restHeadController}
                />
              </FormGroup>
              <FormGroup>
                <label className='label'>Выберите основной канал</label>
                  <AsyncSelect
                    classNamePrefix='form__custom-select'
                    options={channelTypes?.data}
                    getOptionValue={option => option.id.toString()}
                    getOptionLabel={option => option.name}
                    value={mainChannelTypeValue ? channelTypes?.data.find(d => d.id === mainChannelTypeValue) : null}
                    onChange={option => mainChannelTypeOnChange(option ? option.id : option)}
                    isLoading={isLoadingChannelTypes}
                    isDisabled={isErrorChannelTypes}
                    isClearable
                    placeholder="Выберите основной канал..."
                    {...restMainChannelType}
                  />
              </FormGroup>
              <FormGroup>
                <label className='label'>Выберите резервный канал</label>
                <AsyncSelect
                  classNamePrefix='form__custom-select'
                  options={channelTypes?.data}
                  getOptionValue={option => option.id.toString()}
                  getOptionLabel={option => option.name}
                  value={backupChannelTypeValue ? channelTypes?.data.find(d => d.id === backupChannelTypeValue) : null}
                  onChange={option => backupChannelTypeOnChange(option ? option.id : option)}
                  isLoading={isLoadingChannelTypes}
                  isDisabled={isErrorChannelTypes}
                  isClearable
                  placeholder="Выберите резервный канал..."
                  {...restBackupChannelType}
                />
              </FormGroup>
              <FormGroup>
                <label className='label'>Выберите дополнительный канал</label>
                <AsyncSelect
                  classNamePrefix='form__custom-select'
                  options={channelTypes?.data}
                  getOptionValue={option => option.id.toString()}
                  getOptionLabel={option => option.name}
                  value={additionalChannelTypeValue ? channelTypes?.data.find(d => d.id === additionalChannelTypeValue) : null}
                  onChange={option => additionalChannelTypeOnChange(option ? option.id : option)}
                  isLoading={isLoadingChannelTypes}
                  isDisabled={isErrorChannelTypes}
                  isClearable
                  placeholder="Выберите дополнительный канал..."
                  {...restAdditionalChannelType}
                />
              </FormGroup>
              <FormGroup>
                <label className='label'>Выберите GSM оператора</label>
                <AsyncSelect
                  classNamePrefix='form__custom-select'
                  options={gsmOperators}
                  getOptionValue={option => option.id.toString()}
                  getOptionLabel={option => option.name}
                  value={gsmOperatorValue ? gsmOperators?.find(d => d.id === gsmOperatorValue) : null}
                  onChange={option => gsmOperatorOnChange(option ? option.id : option)}
                  isLoading={isLoadingGsmOperators}
                  isDisabled={isErrorGsmOperators}
                  isClearable
                  placeholder="Выберите GSM оператора..."
                  {...restGsmOperator}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  label='Название ПС'
                  name='name'
                  register={register}
                  error={errors.name?.message}
                  validation={{
                    required: {value: true, message: 'Поле является обязательным!'},
                    minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                    maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
                  }}
                  placeholder='Введите название ПС...'
                  defaultValue={substation?.name}
                />
              </FormGroup>
              <FormGroup>
                <label className='label'>Выберите класс U</label>
                <AsyncSelect
                  classNamePrefix='form__custom-select'
                  options={voltageClasses?.data}
                  getOptionValue={option => option.id.toString()}
                  getOptionLabel={option => option.name}
                  value={voltageClassValue ? voltageClasses?.data.find(d => d.id === voltageClassValue) : null}
                  onChange={option => voltageClassOnChange(option ? option.id : option)}
                  isLoading={isLoadingVoltageClasses}
                  isDisabled={isErrorVoltageClasses}
                  isClearable
                  placeholder="Выберите класс U..."
                  {...restVoltageClass}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  label='ip основного канала'
                  name='mainChannelIp'
                  register={register}
                  error={errors.mainChannelIp?.message}
                  placeholder='Введите ip основного канала...'
                  defaultValue={substation?.mainChannelIp}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  label='ip резервного канала'
                  name='backupChannelIp'
                  register={register}
                  error={errors.backupChannelIp?.message}
                  placeholder='Введите ip резервного канала...'
                  defaultValue={substation?.backupChannelIp}
                />
              </FormGroup>
              <FormGroup className='form__group-row'>
                <CustomInput
                  label='РДУ'
                  name='rdu'
                  type='checkbox'
                  register={register}
                />
              </FormGroup>
              <FormGroup className='form__group-row'>
                <CustomInput
                  label='Используется?'
                  name='active'
                  type='checkbox'
                  register={register}
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
