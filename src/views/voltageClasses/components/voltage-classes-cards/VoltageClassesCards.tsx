import { Button, Error, LoadMore, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
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
        <div className="cards">
          {data.pages.map(voltageClasses => (
            voltageClasses.data.map(voltageClass => (
              <SmallCard
                key={voltageClass.id}
                cardText={voltageClass.name}
                childrenControl={
                  <>
                    <Button>
                      <Pencil />
                    </Button>              
                    <Button classBtn='btn-bg_red' onClick={() => deleteVoltageClass.mutate(voltageClass.id)}>
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
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}
