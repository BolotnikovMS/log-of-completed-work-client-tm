import { Button, Error, InfoMessage, LoadMore, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
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
                    <Button classBtn='btn-bg_red' onClick={() => deleteDistrict.mutate(district.id)}>
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
