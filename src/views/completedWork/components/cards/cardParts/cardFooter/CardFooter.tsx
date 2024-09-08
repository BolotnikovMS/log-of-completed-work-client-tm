import moment from 'moment'
import { memo, type FC } from 'react'
import { IPropsCardFooter } from './cardFooter.interface'

const CardFooter: FC<IPropsCardFooter> = memo(({ dateCompletion, workProducerShortName }) => {
  if (!dateCompletion || !workProducerShortName) {
    return <p className='text-title text-red-500'>Нет данных!</p>
  }

  return (
    <>
      <hr className='pb-2' />
      <p className='text-base text-gray-400/70'>
        Дата работ: {moment(dateCompletion, 'YYYY-MM-DD').format('DD.MM.yyyy')}. Выполнил: {workProducerShortName}
      </p>
    </>
  )
})

export default CardFooter
