import { Button, Error, InfoMessage, LoadMore, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDeleteSubstation, useInfiniteSubstations, useModal } from '../../../../hooks'

import { ISubstation } from '../../../../interfaces'
import { isAxiosError } from 'axios'

export const SubstationsCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteSubstations({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [substation, setSubstation] = useState<ISubstation | null>(null)
  const { deleteSubstation } = useDeleteSubstation()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteSubstation.mutate(id)
  }
  
  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {isFetching ? (<Loader />) : 
        (!!data?.pages.length && (
          <div className="cards">
            {data.pages.map(substations => (
              substations.data.map(substation => (
                <SmallCard
                  key={substation.id}
                  cardText={substation.name}
                  childrenControl={
                    <>
                      <Button >
                        <Pencil />
                      </Button>
                      <Button classBtn='btn-bg_red' onClick={() => handleDelete(substation.id)}>
                        <Trash2 />
                      </Button>
                    </>
                  }
                />
              ))
            ))}
          </div>
        ))
      }
      {(!data?.pages?.length && !isFetching && !isError) && <InfoMessage text='Подстанций пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}
