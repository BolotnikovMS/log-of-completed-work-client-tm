import { Button, Error, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import { useDeleteTypeKp, useInfiniteTypesKp } from '../../../../hooks'

import React from 'react'
import { isAxiosError } from 'axios'

export const TypesKpCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteTypesKp({ limit: 10 })
  const { deleteTypeKp } = useDeleteTypeKp()
  const handleDelete = (id: number) => {
    const answer = confirm('Are you sure?')

    if (!answer) return null

    return deleteTypeKp.mutate(id)
  }

  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {!!data?.pages.length && (
        <div className="typeKp__cards">
          {data.pages.map(typesKp => (
            typesKp.data.map(typeKp => (
              <SmallCard
                key={typeKp.id}
                cardText={typeKp.name}
                childrenControl={
                  <>
                    <Button>
                      <Pencil />
                    </Button>              
                    <Button classBtn='btn-bg_red' onClick={() => handleDelete(typeKp.id)}>
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
      {hasNextPage && (
        <div className="typeKp__btns">
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
