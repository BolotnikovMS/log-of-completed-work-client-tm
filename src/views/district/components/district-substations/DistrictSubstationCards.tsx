import { Error, InfoMessage, Loader, SmallCard } from '../../../../components'

import React from 'react'
import { isAxiosError } from 'axios'
import { useDistrictSubstations } from '../../../../hooks'
import { useParams } from 'react-router-dom'

export const DistrictSubstationCards: React.FC = () => {
  const { id } = useParams()
  const { substations, error, isError, isLoading } = useDistrictSubstations(id)
  
  return (
    <>
      {isLoading && <Loader />}
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!substations?.length && (
        <div className="cards">
          {
            substations.map(substation => <SmallCard key={substation.id} cardText={substation.name} path={'#'} />)
          }
        </div>
      )}
      {(!substations?.length && !isLoading && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
    </>
  )
}
