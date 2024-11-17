import { useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SubstationForm } from '..'
import { Badge, Button, Dropdown, Error, Icon, InfoMessage, Loader, Modal, NumberRecords, Pagination, SmallCard } from '../../../../components'
import { pageConfig } from '../../../../config/pages.config'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteSubstation, useModal, useSubstations } from '../../../../hooks'
import { ISubstation } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'
import { TOrderSort } from '../../../../types/order.types'

const SubstationsCards: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const [page, setPage] = useState<number>(1)
  const [searchParams] = useSearchParams()
  const searchParam = searchParams.get('search')
  const sortParam = searchParams.get('sort')
  const orderParam = searchParams.get('order')
  const districtParam = searchParams.get(EFilterParam.district)
  const typeKpParam = searchParams.get(EFilterParam.typeKp)
  const headControllerParam = searchParams.get(EFilterParam.headController)
  const channelCategoryParam = searchParams.get(EFilterParam.channelCategory)
  const channelTypeParam = searchParams.get(EFilterParam.channelType)
  const { substations: data, error, isError, isLoading } = useSubstations({ limit: 20, page, search: searchParam, sort: sortParam, order: orderParam as TOrderSort, typeKp: typeKpParam, headController: headControllerParam, channelCategory: channelCategoryParam, channelType: channelTypeParam, district: districtParam })
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [substation, setSubstation] = useState<ISubstation | null>(null)
  const { deleteSubstation } = useDeleteSubstation()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteSubstation.mutate(id)
  }
  const memoizedSubstations = useMemo(() => data, [data])

  useEffect(() => {
    if (memoizedSubstations?.data.length === 0 && page !== 1) {
      setPage(page - 1)
    }
  }, [memoizedSubstations?.data.length, page])

  if (isError && error) return <Error error={error} />

  if (isLoading) return <Loader />

  return (
    <>
      <NumberRecords text='Всего объектов:' numberRecords={data?.meta.total} />
      {!!memoizedSubstations?.data.length && (
        <div className='flex flex-col gap-2'>
          <div className="cards">
            {memoizedSubstations.data.map(substation => (
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
                path={pageConfig.getDynamicUrl(pageConfig.substation, { id: substation.id })}
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
              />
            ))}
          </div>
          <Pagination page={page} meta={memoizedSubstations.meta} setPage={setPage} />
        </div>
      )}
      {(!data?.data.length && !isLoading && !isError) && <InfoMessage text='Подстанций пока не добавлено...' />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<SubstationForm data={substation} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
    </>
  )
}

export default SubstationsCards
