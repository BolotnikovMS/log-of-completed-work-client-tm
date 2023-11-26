import { Button, Error, InfoMessage, Loader, SmallCard } from '../../../../components'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DistrictService } from '../../../../services/district/district.service'
import React from 'react'
import { isAxiosError } from 'axios'
import { useInfiniteDistricts } from '../../../../hooks'

export const DistrictsCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteDistricts({ limit: 10 })
  const queryClient = useQueryClient()
  const deleteDistrict = useMutation({
    mutationFn: (id: number) => DistrictService.deleteDistrict(id),
    onSuccess: async () => {
      await queryClient.cancelQueries({queryKey: ['districts']})
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['districts']})
    }
  })

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
                path={`/districts/${district.id}/substations`}
                childrenControl={
                  <>
                    <Button>Edit</Button>              
                    <Button classBtn='btn-bg_red' onClick={() => deleteDistrict.mutate(district.id)}>Delete</Button>              
                  </>
                }
              />
            ))
          ))}
        </div>
      )}
      {isFetching && <Loader />}
      {(!data?.pages?.length && !isFetching && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      {hasNextPage && (
        <div className="districts__btns">
          <Button classBtn='btn-bg_blue' type='button' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
            {isFetchingNextPage || isFetching ? 
              'Загрузка...' : 
              hasNextPage ?
              'Показать еще' :
              'Больше нет данных'
            }
          </Button>
        </div>
      )}
    </>
  )
}
