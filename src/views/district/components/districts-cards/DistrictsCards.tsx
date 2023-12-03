import { Button, Error, InfoMessage, LoadMore, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import { useDeleteDistrict, useInfiniteDistricts } from '../../../../hooks'

import React from 'react'
import { isAxiosError } from 'axios'

export const DistrictsCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteDistricts({ limit: 10 })
  const { deleteDistrict } = useDeleteDistrict()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteDistrict.mutate(id)
  }

  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!data?.pages.length && (
        <div className="cards">
          {data.pages.map(districts => (
            districts.data.map(district => (
              <SmallCard
                key={district.id}
                cardText={district.name}
                path={`/districts/${district.id}/substations`}
                childrenControl={
                  <>
                    <Button>
                      <Pencil />
                    </Button>              
                    <Button classBtn='btn-bg_red' onClick={() => handleDelete(district.id)}>
                      <Trash2 />
                    </Button>              
                  </>
                }
              />
            ))
          ))}
        </div>
      )}
      {isFetching && <Loader />}
      {(!data?.pages?.length && !isFetching && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}
