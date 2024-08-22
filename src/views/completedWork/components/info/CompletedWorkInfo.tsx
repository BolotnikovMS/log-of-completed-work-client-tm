import moment from 'moment'
import { type FC } from 'react'
import { Group } from '../../../../components'
import { IPropsCompletedWorkInfo } from './CompletedWorkInfo.interface'
import './completedWork.scss'

const CompletedWorkInfo: FC<IPropsCompletedWorkInfo> = ({ completedWork }) => {
  return (
    <div className='work-info'>
      <div className='work-info__content'>
        <Group>
          <p className='work-info__text'>Объект:
            <span className='text-content'>
              {completedWork?.substation?.fullNameSubstation}
            </span>
          </p>
        </Group>
        <Group>
          <p className='work-info__text'>Дата проведения работ:
            <span className='text-content'>
              {moment(completedWork.dateCompletion, 'YYYY-MM-DD').format('DD.MM.yyyy')}
            </span>
          </p>
        </Group>
        <Group>
          <p className='work-info__text'>
            Производитель работ:
            <span className='text-content'>
              {completedWork?.work_producer?.shortName}
            </span>
          </p>
        </Group>
        <Group>
          <p className='work-info__text'>
            Автор записи:
            <span className='text-content'>
              {completedWork?.author?.shortName}
            </span>
          </p>
        </Group>
      </div>
      <div className='work-info__content'>
        <div className='work-info__titles'>
          <h2 className="text-title font-bold">Описание выполненной работы</h2>
        </div>
        <p className='text-content'>{completedWork.description}</p>
        {completedWork.note && (
          <>
            <div className='work-info__titles mt-5'>
              <h2 className="text-title font-bold">Примечание</h2>
            </div>
            <p className='text-content'>{completedWork.note}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default CompletedWorkInfo
