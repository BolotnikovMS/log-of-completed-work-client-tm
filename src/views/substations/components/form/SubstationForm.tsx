import { Button, CustomInput, FormGroup } from '../../../../components'
import { IPropsSubstationForm, ISubstationFields } from './substationForm.interface'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'

export const SubstationForm: React.FC<IPropsSubstationForm> = ({ substation, isEdited, setIsEdited, toggleModal }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<ISubstationFields>({
    mode: 'onBlur'
  })
  const queryClient = useQueryClient()
  
  return (
    <>
      <div className="work-log__form">
        <form className="form form-col">
          <div className="form__content form__content-col">
            <FormGroup>
              <CustomInput
                label='Выберите район'
                name='district'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='Класс U'
                name='voltageClass'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='Тип КП'
                name='typeKp'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='Головной контроллер'
                name='headController'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='Основной канал'
                name='mainChannel'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='Резервный канал'
                name='backupChannel'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='Дополнительный канал'
                name='additionalChannel'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='GSM оператор'
                name='gsm'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='Название ПС'
                name='name'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='ip основного канала'
                name='mainChannelIp'
                register={register}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                label='ip резервного канала'
                name='backupChannelIp'
                register={register}
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
      </div>
    </>
  )
}
