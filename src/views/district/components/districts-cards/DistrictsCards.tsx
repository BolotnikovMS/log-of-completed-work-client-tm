import { Badge, Button, Error, InfoMessage, Loader, SmallCard } from '../../../../components'

import React from 'react'
import { isAxiosError } from 'axios'
import { useInfiniteDistricts } from '../../../../hooks'

export const DistrictsCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteDistricts({ limit: 10 })

  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!data?.pages.length && (
        <div className="districts__cards">
          {data.pages.map(districts => (
            districts.data.map(district => (
              <SmallCard
                key={district.id}
                cardText={district.name}
                className={district.active ? '' : 'inActive'}
                path={`/districts/${district.id}/substations`}
              >
                {
                  !district.active && <Badge text='Не исп.' className={district.active ? '' : 'badge-color_red'} />
                }
              </SmallCard>
            ))
          ))}
        </div>
      )}
      {isFetching && <Loader />}
      {(!data?.pages?.length && !isFetching && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      {
        hasNextPage && (
          <div className="districts__btns">
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
