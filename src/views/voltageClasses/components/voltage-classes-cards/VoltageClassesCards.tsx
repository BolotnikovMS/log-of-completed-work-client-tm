import { Button, Error, Loader, SmallCard } from '../../../../components'

import React from 'react'
import { isAxiosError } from 'axios'
import { useInfiniteVoltageClasses } from '../../../../hooks'

export const VoltageClassesCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteVoltageClasses({ limit: 10 })
  
  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!data?.pages.length && (
        <div className="voltage__cards">
          {data.pages.map(voltageClasses => (
            voltageClasses.data.map(voltageClass => (
              <SmallCard
                key={voltageClass.id}
                cardText={voltageClass.name}
              />
            ))
          ))}
        </div>
      )}
      {isFetching && <Loader />}
      {
        hasNextPage && (
          <div className="voltage__btns">
            <Button classBtn='btn-bg_blue' type='button' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {
                isFetchingNextPage || isFetching ? 
                'Загрузка...' : 
                hasNextPage ?
                'Показать еще' :
                'Больше нет данных'
              }
            </Button>
          </div>
        )
      }
    </>
  )
}
