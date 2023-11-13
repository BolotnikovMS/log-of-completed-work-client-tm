import './district.scss'

import { Button, CustomInput, Error, FormGroup, InfoMessage, Loader, SmallCard } from '../../components'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AxiosError } from 'axios'
import { useDistrict } from '../../hooks'

interface IDistrictFields {
  name: string
  shortName: string
  active?: boolean
}

export const DistrictPage = () => {
  const { districts, error, isError, isLoading } = useDistrict()
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IDistrictFields>({
    mode: 'onBlur'
  })

  const submit: SubmitHandler<IDistrictFields> = (data) => {
    console.log(data);
    reset()
  }
  
  return (
    <div className="districts">
      <div className="districts__content">
        <div className="districts__titles">
          <h2 className="title">Районы и ГП</h2>
        </div>
        <div className="districts__form">
          <form className="form" onSubmit={handleSubmit(submit)}>
            <div className="form__content">
              <FormGroup>
                <CustomInput
                  label='Название Района или ГП'
                  name='name'
                  register={register}
                  error={errors.name?.message}
                  validation={{
                    required: {value: true, message: 'Поле является обязательным!'},
                    minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                    maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
                  }}
                  placeholder='Введите название...'
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  label='Сокращенное название'
                  name='shortName'
                  register={register}
                  error={errors.shortName?.message}
                  validation={{
                    required: {value: true, message: 'Поле является обязательным!'},
                    minLength: {value: 3, message: 'Минимальная длина поля 3 символа!'},
                    maxLength: {value: 200, message: 'Максимальная длина поля 200 символов!'}
                  }}
                  placeholder='Введите сокращенное название...'
                />
              </FormGroup>
              <FormGroup className='form__group-row'>
                <CustomInput
                  label='Используется?'
                  name='active'
                  register={register}
                  type='checkbox'
                />
              </FormGroup>
            </div>
            <div className="form__btns">
              <Button disabled={isLoading || isError || !isValid} classBtn='btn-bg_green'>Добавить</Button>
            </div>
          </form>
        </div>
        <div className="districts__control">Control</div>
          {isLoading && <Loader />}
          {isError && <Error message={(error as AxiosError).message} />}
          {!!districts?.length && (
            <div className="districts__cards">
              {
                districts.map(district => <SmallCard key={district.id} cardText={district.name} />)
              }
            </div>
          )}
          {!districts?.length && !isLoading && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      </div>
    </div>
  )
}
