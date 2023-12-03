import { Error, InfoMessage, Loader, SmallCard } from '../../../../components'

import React from 'react'
import { isAxiosError } from 'axios'
import { useSubstations } from '../../../../hooks/substations/useSubstations'

export const SubstationsCards: React.FC = () => {
  const { substations, error, isError, isLoading } = useSubstations()
  
  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!substations?.length && (
        <div className="cards">
          {
            substations.map(substation => <SmallCard key={substation.id} cardText={substation.name} path={'#'} />)
          }
        </div>
      )}
      {(!substations?.length && !isLoading && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      {isLoading && <Loader />}
    </>
  )
}
