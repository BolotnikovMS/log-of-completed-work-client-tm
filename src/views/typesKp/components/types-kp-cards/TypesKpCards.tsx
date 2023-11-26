import { Button, Error, Loader, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import React from 'react'
import { TypeKpService } from '../../../../services/types-kp/type-kp.service'
import { isAxiosError } from 'axios'
import { useInfiniteTypesKp } from '../../../../hooks'

export const TypesKpCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteTypesKp({ limit: 10 })
  const queryClient = useQueryClient()
  const deleteTypeKp = useMutation({
    mutationFn: (id: number) => TypeKpService.deleteTypeKp(id),
    onSuccess: async () => {
      await queryClient.cancelQueries({queryKey: ['typesKp']})
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['typesKp']})
    }
  })

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
                    <Button classBtn='btn-bg_red' onClick={() => deleteTypeKp.mutate(typeKp.id)}>
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
