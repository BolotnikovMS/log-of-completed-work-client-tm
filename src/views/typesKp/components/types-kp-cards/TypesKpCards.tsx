import { Button, Error, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDeleteTypeKp, useInfiniteTypesKp, useModal } from '../../../../hooks'

import { ITypeKp } from '../../../../interfaces'
import { TypeKpForm } from '..'
import { isAxiosError } from 'axios'

export const TypesKpCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteTypesKp({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [typeKp, setDistrict] = useState<ITypeKp | null>(null)
  const { deleteTypeKp } = useDeleteTypeKp()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteTypeKp.mutate(id)
  }

  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {isFetching ? (<Loader />) :
        (!!data?.pages.length && (
          <div className="work-log__cards">
            {data.pages.map(typesKp => (
              typesKp.data.map(typeKp => (
                <SmallCard
                  key={typeKp.id}
                  cardText={typeKp.name}
                  childrenControl={
                    <>
                      <Button onClick={() => {toggleModal(), setDistrict(typeKp), setIsEdited(!isEdited)}}>
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
        )
      )
    }
      {isFetching && <Loader />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<TypeKpForm typeKp={typeKp} isEdited={isEdited} toggleModal={toggleModal} setIsEdited={setIsEdited} />}/>
    </>
  )
}
