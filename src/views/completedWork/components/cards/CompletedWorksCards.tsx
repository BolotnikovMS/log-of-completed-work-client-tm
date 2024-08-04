import moment from 'moment'
import { useState, type FC } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CompletedWorkForm, CompletedWorkInfo } from '..'
import { Button, Card, Error, InfoMessage, LoadMore, Loader, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useDeleteCompletedWork, useModal } from '../../../../hooks'
import { useInfiniteCompletedWork } from '../../../../hooks/completed-works/useInfiniteCompletedWork'
import { Delete, Edit, Note } from '../../../../icons'
import { ICompletedWork } from '../../../../interfaces'
import { useAuthStore } from '../../../../store/auth'

const CompletedWorksCards: FC = () => {
  const { authUser } = useAuthStore()
  const [searchParams] = useSearchParams()
  const substationParam = searchParams.get('substation')
  const executorParam = searchParams.get('executor')
  const dateStartParam = searchParams.get('dateStart')
  const dateEndParam = searchParams.get('dateEnd')
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteCompletedWork({ limit: 15, substation: substationParam, executor: executorParam, dateStart: dateStartParam, dateEnd: dateEndParam })
  const { isModal, toggleModal } = useModal()
  const { isModal: isModalView, toggleModal: toggleModalView } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [completedWork, setCompetedWork] = useState<ICompletedWork | null>(null)
  const { deleteCompletedWork } = useDeleteCompletedWork()
  const handleDelete = (id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteCompletedWork.mutate(id)
  }

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      <div style={{ 'padding': '0 0 15px' }}>Всего записей: {data?.pages[0].meta.total}</div>
      {!!data?.pages[0].data.length && (
        <div className="cards">
          {data.pages.map(completedWorks => (
            completedWorks.data.map(completedWork => (
              <Card
                key={completedWork.id}
                childrenHeader={<p className='card__text card__text-bold'><Link to={`/substations/${completedWork?.substation?.id}`}>{completedWork?.substation?.fullNameSubstation}</Link></p>}
                childrenBody={<p>{completedWork.shortText}</p>}
                childrenFooter={<p>Дата работ: {moment(completedWork.dateCompletion, 'YYYY-MM-DD').format('DD.MM.yyyy')}. Выполнил: {completedWork?.work_producer?.shortName} </p>}
                childrenControl={
                  <>
                    <Button onClick={() => { toggleModalView(), setCompetedWork(completedWork) }}>
                      <Note className='icon' />
                    </Button>
                    {
                      checkRole(authUser, [ERoles.Admin, ERoles.Moderator], true, completedWork) && (
                        <Button onClick={() => { toggleModal(), setCompetedWork(completedWork), setIsEdited(!isEdited) }}>
                          <Edit className='icon' />
                        </Button>
                      )
                    }
                    {
                      checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
                        <Button classBtn='btn-bg_red' onClick={() => handleDelete(completedWork.id)}>
                          <Delete className='icon' />
                        </Button>
                      )
                    }
                  </>
                }
              />
            ))
          ))}
        </div>
      )}
      {(!data?.pages[0].meta.total && !isFetching && !isError) && <InfoMessage text='Пока нет выполненных работ по ПС...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal visible={isModal} title='Редактирование записи' onToggle={() => { toggleModal(), setIsEdited(false) }} content={<CompletedWorkForm completedWork={completedWork} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />} />
      <Modal
        visible={isModalView}
        title='Подробный просмотр выполненной работы'
        onToggle={() => { toggleModalView() }} content={<CompletedWorkInfo completedWork={completedWork!} />}
      />
    </>
  )
}

export default CompletedWorksCards
