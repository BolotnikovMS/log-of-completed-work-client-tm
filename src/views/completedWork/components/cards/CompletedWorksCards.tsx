import { useCallback, useEffect, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompletedWorkInfo } from '..'
import { Card, Error, InfoMessage, Loader, Modal, NumberRecords, Pagination } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useCompletedWork, useModal } from '../../../../hooks'
import { ICompletedWork } from '../../../../interfaces'
import { CardContent, CardControl, CardFooter, CardHeader } from './cardParts'

const CompletedWorksCards: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [searchParams] = useSearchParams()
  const substationParam = searchParams.get(EFilterParam.substation)
  const executorParam = searchParams.get(EFilterParam.executor)
  const dateStartParam = searchParams.get(EFilterParam.dateStart)
  const dateEndParam = searchParams.get(EFilterParam.dateEnd)
  const typeWorkParam = searchParams.get(EFilterParam.typeWork)
  const { data, error, isError, isLoading } = useCompletedWork({ limit: 15, page, substation: substationParam, executor: executorParam, dateStart: dateStartParam, dateEnd: dateEndParam, typeWork: typeWorkParam })
  const { isModal: isModalView, toggleModal: toggleModalView } = useModal()
  const [completedWork, setCompetedWork] = useState<ICompletedWork | null>(null)
  const handleOpenInfo = useCallback((work: ICompletedWork) => {
    toggleModalView()
    setCompetedWork(work)
  }, [toggleModalView])

  useEffect(() => {
    if (data?.data.length === 0 && page !== 1) {
      setPage(page - 1)
    }
  }, [data?.data.length, page])

  if (isError && error) return <Error error={error} />

  if (isLoading) return <Loader />

  return (
    <>
      <NumberRecords text='Всего записей:' numberRecords={data?.meta.total} />
      {!!data?.data.length && (
        <div className='flex flex-col gap-2'>
          <div className="cards-work">
            {data.data.map(completedWork => (
              <Card
                key={completedWork.id}
                classBody='!py-4'
                childrenHeader={
                  <CardHeader
                    substationId={completedWork.substationId}
                    substationFullName={completedWork.substation}
                    typeWork={completedWork.type_work}
                  />
                }
                childrenContent={<CardContent description={completedWork.description} />}
                childrenFooter={
                  <CardFooter
                    dateCompletion={completedWork.dateCompletion}
                    workProducerShortName={completedWork.work_producer}
                  />
                }
                childrenControl={
                  <CardControl
                    completedWork={completedWork}
                  />
                }
                onClick={() => handleOpenInfo(completedWork)}
              />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} setPage={setPage} />
        </div>
      )}
      {(!data?.meta.total && !isLoading && !isError) && <InfoMessage text='Пока выполненных работ не добавлено...' />}
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
