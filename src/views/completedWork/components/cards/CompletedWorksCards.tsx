import { useCallback, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompletedWorkInfo } from '..'
import { Card, Error, InfoMessage, LoadMore, Loader, Modal, NumberRecords } from '../../../../components'
import { useModal } from '../../../../hooks'
import { useInfiniteCompletedWork } from '../../../../hooks/completed-works/useInfiniteCompletedWork'
import { ICompletedWork } from '../../../../interfaces'
import { CardContent, CardControl, CardFooter, CardHeader } from './cardParts'

const CompletedWorksCards: FC = () => {
  const [searchParams] = useSearchParams()
  const substationParam = searchParams.get('substation')
  const executorParam = searchParams.get('executor')
  const dateStartParam = searchParams.get('dateStart')
  const dateEndParam = searchParams.get('dateEnd')
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useInfiniteCompletedWork({ limit: 15, substation: substationParam, executor: executorParam, dateStart: dateStartParam, dateEnd: dateEndParam })
  const { isModal: isModalView, toggleModal: toggleModalView } = useModal()
  const [completedWork, setCompetedWork] = useState<ICompletedWork | null>(null)
  const handleOpenInfo = useCallback((work: ICompletedWork) => {
    toggleModalView()
    setCompetedWork(work)
  }, [toggleModalView])

  if (isError && error) return <Error error={error} />

  if (isFetching) return <Loader />

  return (
    <>
      <NumberRecords text='Всего записей:' numberRecords={data?.pages[0].meta.total} />
      {!!data?.pages[0].data.length && (
        <div className="cards-work">
          {data.pages.map(completedWorks => (
            completedWorks.data.map(completedWork => (
              <Card
                key={completedWork.id}
                classBody='!py-4'
                childrenHeader={<CardHeader substationId={completedWork.substation.id} substationFullName={completedWork.substation.fullNameSubstation} />}
                childrenContent={<CardContent shortText={completedWork.shortText} />}
                childrenFooter={
                  <CardFooter
                    dateCompletion={completedWork.dateCompletion}
                    workProducerShortName={completedWork.work_producer.shortName}
                  />
                }
                childrenControl={
                  <CardControl
                    completedWork={completedWork}
                  />
                }
                onClick={() => handleOpenInfo(completedWork)}
              />
            ))
          ))}
        </div >
      )}
      {(!data?.pages[0].meta.total && !isFetching && !isError) && <InfoMessage text='Пока нет выполненных работ по ПС...' />}
      {hasNextPage && <LoadMore hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
      <Modal
        visible={isModalView}
        title='Подробный просмотр выполненной работы'
        classDialog='!min-w-[850px]'
        onToggle={() => { toggleModalView() }}
        content={
          <CompletedWorkInfo completedWork={completedWork!} />
        }
      />
    </>
  )
}

export default CompletedWorksCards
