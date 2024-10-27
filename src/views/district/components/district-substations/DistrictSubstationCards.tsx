import { isAxiosError } from 'axios'
import { useMemo, useState, type FC } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Badge, Button, Dropdown, Error, Icon, InfoMessage, Loader, Modal, NumberRecords, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers'
import { useDeleteSubstation, useDistrictSubstations, useModal } from '../../../../hooks'
import { ISubstation } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import { TOrderSort } from '../../../../types/order.types'
import { SubstationForm } from '../../../substations/components'

const DistrictSubstationCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const searchParam = searchParams.get('search')
  const sortParam = searchParams.get('sort')
  const orderParam = searchParams.get('order')
  const typeKpParam = searchParams.get('typeKp')
  const headControllerParam = searchParams.get('headController')
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [substationData, setSubstation] = useState<ISubstation | null>(null)
  const { deleteSubstation } = useDeleteSubstation()
  const { substations, error, isError, isLoading } = useDistrictSubstations({ id, search: searchParam, sort: sortParam, order: orderParam as TOrderSort, typeKp: typeKpParam, headController: headControllerParam })
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteSubstation.mutate(id)
  }
  const memoizedSubstations = useMemo(() => substations, [substations])

  return (
    <>
      {isLoading && <Loader />}
      {(isError && isAxiosError(error)) && <Error error={error} />}
      <NumberRecords text='Всего объектов:' numberRecords={substations?.length} />
      {!!memoizedSubstations?.length && (
        <div className="cards">
          {memoizedSubstations.map(substation => (
            <SmallCard
              key={substation.id}
              childrenContent={
                <>
                  {substation.rdu && <Badge text='РДУ' className='mBadge_red' />}
                  <p className='text-content flex items-center gap-1'>
                    <Icon id='link' />
                    {substation.fullNameSubstation}
                  </p>
                </>
              }
              path={`/substations/${substation.id}`}
              childrenControl={
                isAdminOrModerator && (
                  <Dropdown
                    children={
                      <Icon id='setting' />
                    }
                    menuItems={[
                      isAdminOrModerator && (
                        <Button className='!justify-start' onClick={() => { toggleModal(), setSubstation(substation), setIsEdited(!isEdited) }}>
                          <Icon id='edit' />
                          Редактировать
                        </Button>
                      ),
                      isAdmin && (
                        <Button className='btn-error !justify-start' onClick={() => handleDelete(substation.id)}>
                          <Icon id='delete' />
                          Удалить
                        </Button>
                      )
                    ]}
                  />
                )
              }
            />))
          }
        </div>
      )}
      {(!substations?.length && !isLoading && !isError) && <InfoMessage text='Подстанций пока не добавлено...' />}
      <Modal visible={isModal} title='Редактирование' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<SubstationForm data={substationData} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default DistrictSubstationCards
