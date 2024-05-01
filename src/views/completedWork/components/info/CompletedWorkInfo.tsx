import cx from 'classnames'
import moment from 'moment'
import { type FC } from 'react'
import { Group } from '../../../../components'
import styles from './completedWork.module.scss'
import { IPropsCompletedWorkInfo } from './CompletedWorkInfo.interface'

const CompletedWorkInfo: FC<IPropsCompletedWorkInfo> = ({ completedWork }) => {
	return (
		<div className={styles['work-info']}>
			<div className={styles['work-info-content']}>
				<Group>
					<p className={styles.text}>Объект:
						<span className={styles['sub-text']}>
							{completedWork.substation.fullNameSubstation}
						</span>
					</p>
				</Group>
				<Group>
					<p className={styles.text}>Дата проведения работ:
						<span className={styles['sub-text']}>
							{moment(completedWork.dateCompletion, 'MM/DD/yyyy').format('DD.MM.yyyy')}
						</span>
					</p>
				</Group>
				<Group>
					<p className={styles.text}>
						Производитель работ:
						<span className={styles['sub-text']}>
							{completedWork.work_producer.shortName}
						</span>
					</p>
				</Group>
			</div>
			<div className={styles['work-info-content']}>
				<div className={styles['work-info-titles']}>
					<h2 className="title-1">Описание выполненной работы</h2>
				</div>
				<p className={cx(styles.text, styles['text-mt-5'])}>{completedWork.description}</p>
				{completedWork.note && (
					<>
						<div className={cx(styles.text, styles['work-info-titles'], styles['work-info-titles-mt-18'])}>
							<h2 className="title-1">Примечание</h2>
						</div>
						<p className={cx(styles.text, styles['text-mt-5'])}>{completedWork.note}</p>
					</>
				)}
			</div>
		</div>
		)
	}

	export default CompletedWorkInfo