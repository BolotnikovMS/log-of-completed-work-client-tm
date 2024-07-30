import cx from 'classnames'
import moment from 'moment'
import { type FC } from 'react'
import { Group } from '../../../../components'
import { IPropsCompletedWorkInfo } from './CompletedWorkInfo.interface'
import styles from './completedWork.module.scss'

const CompletedWorkInfo: FC<IPropsCompletedWorkInfo> = ({ completedWork }) => {
  return (
    <div className={styles.workInfo}>
      <div className={styles.workInfoContent}>
        <Group>
          <p className='text'>Объект:
            <span className='sub-text'>
              {completedWork?.substation?.fullNameSubstation}
            </span>
          </p>
        </Group>
        <Group>
          <p className='text'>Дата проведения работ:
            <span className='sub-text'>
              {moment(completedWork.dateCompletion, 'YYYY-MM-DD').format('DD.MM.yyyy')}
            </span>
          </p>
        </Group>
        <Group>
          <p className='text'>
            Производитель работ:
            <span className='sub-text'>
              {completedWork?.work_producer?.shortName}
            </span>
          </p>
        </Group>
        <Group>
          <p className='text'>
            Автор записи:
            <span className='sub-text'>
              {completedWork?.author?.shortName}
            </span>
          </p>
        </Group>
      </div>
      <div className={styles.workInfoContent}>
        <div className={styles.workInfoTitles}>
          <h2 className="title-1">Описание выполненной работы</h2>
        </div>
        <p className='text text-mt-5'>{completedWork.description}</p>
        {completedWork.note && (
          <>
            <div className={cx(styles.workInfoTitles, styles['workInfoTitles-mt-18'])}>
              <h2 className="title-1">Примечание</h2>
            </div>
            <p className='text text-mt-5'>{completedWork.note}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default CompletedWorkInfo
