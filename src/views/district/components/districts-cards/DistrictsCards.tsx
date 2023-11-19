import { Button, Error, InfoMessage, Loader, SmallCard } from '../../../../components'

import { DistrictService } from '../../../../services/district/district.service'
import React from 'react'
import { isAxiosError } from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'

export const DistrictsCards: React.FC = () => {
  // const { districts, error, isError, isLoading } = useDistricts({ limit: 5 })
  const limit = 5
  const { 
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    } = useInfiniteQuery({
    queryKey: ['districts'],
    queryFn: ({ pageParam = 1 }) => DistrictService.getDistricts({page: pageParam, limit}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const totalPages = Math.round(allPages[0].meta.total / limit)

      return totalPages >= nextPage && lastPage.data.length !== 0 ? nextPage : undefined
    }
  })

  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!data?.pages.length && (
        <div className="districts__cards">
          {data.pages.map(districts => (
            districts.data.map(district => <SmallCard key={district.id} cardText={district.name} path={`/districts/${district.id}/substations`} />)
          ))}
        </div>
      )}
      {isFetching && <Loader />}
      {(!data?.pages?.length && !isFetching && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
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
    </>
  )
}
