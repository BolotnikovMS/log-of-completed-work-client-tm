import { Button, Error, Loader, SmallCard } from '../../../../components'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import React from 'react'
import { VoltageClassService } from '../../../../services/voltage-class/voltage-class.service'
import { isAxiosError } from 'axios'
import { useInfiniteVoltageClasses } from '../../../../hooks'

export const VoltageClassesCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteVoltageClasses({ limit: 10 })
  const queryClient = useQueryClient()
  const deleteVoltageClass = useMutation({
    mutationFn: (id: number) => VoltageClassService.deleteVoltageClass(id),
    onSuccess: async () => {
      await queryClient.cancelQueries({queryKey: ['voltageClasses']})
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['voltageClasses']})
    }
  })
  
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
                childrenControl={
                  <>
                    <Button>Edit</Button>              
                    <Button classBtn='btn-bg_red' onClick={() => deleteVoltageClass.mutate(voltageClass.id)}>Delete</Button>              
                  </>
                }
              />
            ))
          ))}
        </div>
      )}
      {isFetching && <Loader />}
      {hasNextPage && (
        <div className="voltage__btns">
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
