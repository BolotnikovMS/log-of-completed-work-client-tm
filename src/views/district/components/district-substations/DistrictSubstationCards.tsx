import { Error, InfoMessage, Loader, SmallCard } from '../../../../components'

import { isAxiosError } from 'axios'
import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import { useDistrictSubstations } from '../../../../hooks'

const DistrictSubstationCards: FC = () => {
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

export default DistrictSubstationCards