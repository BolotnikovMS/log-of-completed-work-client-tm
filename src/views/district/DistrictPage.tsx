import './district.scss'

import { Button, Error, FormGroup, InfoMessage, Loader, SmallCard, TextInput } from '../../components'

import { AxiosError } from 'axios'
import { useDistrict } from '../../hooks'
import { useForm } from 'react-hook-form'

interface IDistrictFields {
  name: string
  shortName: string
  active?: boolean
}

export const DistrictPage = () => {
  const { districts, error, isError, isLoading } = useDistrict()
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<IDistrictFields>({
    mode: 'onBlur'
  })
  
  return (
    <div className="districts">
      <div className="districts__content">
        <div className="districts__titles">
          <h2 className="title">Районы и ГП</h2>
        </div>
        <div className="districts__form">
          <form action="" className="form">
            <div className="form__content">
              <FormGroup>
                <TextInput
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
              <div className="form__group">
                <label htmlFor="shortName">Короткое название</label>
                <input type="text" id='shortName' name='shortName' className='input' />
              </div>
              <div className="form__group">
                <label htmlFor="active">Используется?</label>
                <input type="checkbox" id='active' name='active' className='input' />
              </div>
            </div>
            <div className="form__btns">
              <Button disabled={isLoading || isError} classBtn='btn-bg_green'>Добавить</Button>
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
