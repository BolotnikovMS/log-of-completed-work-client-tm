import cx from 'classnames'
import { useState, type FC } from 'react'
import Error from '../error/Error'
import { IPropsTab } from './tab.interface'
import styles from './tab.module.scss'

const Tab: FC<IPropsTab> = ({tabs}) => {
	const [toggleState, setToggleState] = useState<number>(0)
	const toggleTab = (index: number) => setToggleState(index)

	if (!tabs.length) return <Error error={{message: 'Данные для табов не переданы!!'} as Error} />

	return (
		<div className={styles.wrapper}>
			<ul className={styles.tabs}>
				{tabs.map((tab, index) => (
					<li key={tab.id} className={cx(styles.tab, toggleState === index && styles.active)} onClick={() => toggleTab(index)}>
						<span className='text'>{tab.label}</span>
					</li>
				))}
      </ul>
      <div className="content-container">
				{tabs.map((tab, index) => (
					<div key={tab.id} className={cx(styles['tab-content'], toggleState === index && styles.active)}>
						{tab.content}
					</div>
				))}
      </div>
    </div>
	)
}

export default Tab