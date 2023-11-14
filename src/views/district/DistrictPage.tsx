import './district.scss'

import { Error, InfoMessage, Loader, SmallCard } from '../../components'

import { AxiosError } from 'axios'
import { DistrictForm } from './components/form/DistrictForm'
import { useDistricts } from '../../hooks'

export const DistrictPage = () => {
  const { districts, error, isError, isLoading } = useDistricts()
  
  return (
    <div className="districts">
      <div className="districts__content">
        <div className="districts__titles">
          <h2 className="title">Районы и ГП</h2>
        </div>
        <div className="districts__form">
          <DistrictForm />
        </div>
        <div className="districts__control">Control</div>
          {isLoading && <Loader />}
          {isError && <Error message={(error as AxiosError).message} />}
          {!!districts?.length && (
            <div className="districts__cards">
              {
                districts.map(district => <SmallCard key={district.id} cardText={district.name} path={`/districts/${district.id}/substations`} />)
              }
            </div>
          )}
          {(!districts?.length && !isLoading) || isError && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      </div>
    </div>
  )
}
