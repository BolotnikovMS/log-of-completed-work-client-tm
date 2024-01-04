import { Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button, Error, InfoMessage, LoadMore, Loader, Modal, SmallCard } from '../../../../components'
import { useDeleteDistrict, useInfiniteDistricts, useModal } from '../../../../hooks'

import { isAxiosError } from 'axios'
import { DistrictForm } from '..'
import { IDistrict } from '../../../../interfaces'

export const DistrictsCards: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteDistricts({ limit: 10 })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [district, setDistrict] = useState<IDistrict | null>(null)
  const { deleteDistrict } = useDeleteDistrict()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')
    
    if (!answer) return null

    return deleteDistrict.mutate(id)
  }

  return (
    <>
      {(isError && isAxiosError(error)) && <Error error={error}/>}
      {isFetching ? (<Loader />) : 
        (!!data?.pages.length && (
          <div className="cards">
            {data.pages.map(districts => (
              districts.data.map(district => (
                <SmallCard
                  key={district.id}
                  cardText={district.name}
                  path={`/districts/${district.id}/substations`}
                  childrenControl={
                    <>
                      <Button onClick={() => {toggleModal(), setDistrict(district), setIsEdited(!isEdited)}}>
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
        ))
      }
      {(!data?.pages?.length && !isFetching && !isError) && <InfoMessage text='Районов или ГП пока не добавлено...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => {toggleModal(), setIsEdited(false)}} content={<DistrictForm district={district} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}/>
    </>
  )
}
