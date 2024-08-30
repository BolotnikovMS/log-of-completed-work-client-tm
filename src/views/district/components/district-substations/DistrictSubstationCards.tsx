import { isAxiosError } from 'axios'
import { useMemo, useState, type FC } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Badge, Button, Dropdown, Error, InfoMessage, Loader, Modal, SmallCard } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers'
import { useDeleteSubstation, useDistrictSubstations, useModal } from '../../../../hooks'
import { Delete, Edit, LinkIcon, Setting } from '../../../../icons'
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
      <div className='flex items-center gap-1 text-title py-3'>Всего объектов:
        <span className='font-bold'>
          {substations?.length}
        </span>
      </div>
      {!!memoizedSubstations?.length && (
        <div className="cards">
          {memoizedSubstations.map(substation => (
            <SmallCard
              key={substation.id}
              childrenContent={
                <>
                  {substation.rdu && <Badge text='РДУ' className='mBadge_red' />}
                  <p className='text-content flex items-center gap-1'>
                    <LinkIcon className='icon' />
                    {substation.fullNameSubstation}
                  </p>
                </>
              }
              path={`/substations/${substation.id}`}
              childrenControl={
                isAdminOrModerator && (
                  <Dropdown
                    children={
                      <Setting className='icon' />
                    }
                    menuItems={[
                      isAdminOrModerator && (
                        <Button className='!justify-start' onClick={() => { toggleModal(), setSubstation(substation), setIsEdited(!isEdited) }}>
                          <Edit className='icon' />
                          Редактировать
                        </Button>
                      ),
                      isAdmin && (
                        <Button className='btn-error !justify-start' onClick={() => handleDelete(substation.id)}>
                          <Delete className='icon' />
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
      <Modal visible={isModal} title='Редактирование' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<SubstationForm substation={substationData} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default DistrictSubstationCards
