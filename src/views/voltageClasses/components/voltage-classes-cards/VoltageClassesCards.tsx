import { Button, Error, LoadMore, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import { useDeleteVoltageClass, useInfiniteVoltageClasses } from '../../../../hooks'

import React from 'react'
import { isAxiosError } from 'axios'

export const VoltageClassesCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteVoltageClasses({ limit: 10 })
  const { deleteVoltageClass } = useDeleteVoltageClass()
  const handleDelete = (id:number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteVoltageClass.mutate(id)
  }
  
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
                    <Button classBtn='btn-bg_red' onClick={() => handleDelete(voltageClass.id)}>
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
