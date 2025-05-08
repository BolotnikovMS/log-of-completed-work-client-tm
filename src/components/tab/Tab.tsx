import { default as cn } from 'classnames'
import { useState, type FC } from 'react'
import Error from '../error/Error'
import { IPropsTab } from './tab.interface'
import './tab.scss'

const Tab: FC<IPropsTab> = ({ tabs, classContainer, classTab }) => {
	const [toggleState, setToggleState] = useState<number>(0)
	const toggleTab = (index: number) => setToggleState(index)

	if (!tabs.length) return <Error error={{ message: 'Данные для табов не переданы!!' } as Error} />

	return (
		<div className={classTab}>
			<ul className='mTab__menu'>
				{tabs.map((tab, index) => (
					<li key={tab.id} className={cn('mTab__menu-item', toggleState === index && '!border-black')} onClick={() => toggleTab(index)} aria-label={tab.label}>
						{tab.icon && tab.icon}
						<span className='text-title'>{tab.label}</span>
					</li>
				))}
			</ul>
			<div className='mTab-container'>
				{tabs.map((tab, index) => (
					<div key={tab.id} className={cn('py-2', toggleState === index ? 'block' : 'hidden', classContainer)}>
						{tab.content}
					</div>
				))}
			</div>
		</div>
	)
}

export default Tab
