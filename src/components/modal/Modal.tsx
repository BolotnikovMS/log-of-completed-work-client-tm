import cx from 'classnames'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import Icon from '../icon/Icon'
import { IPropsModal } from './modal.interface'
import './modal.scss'

export const Modal: FC<IPropsModal> = ({ visible, title, content, footer, classDialog, onToggle }) => {
	if (!visible) return null

	return createPortal(
		<dialog className="mModal" open={visible} onClick={e => e.stopPropagation()}>
			<div className={cx('mModal__dialog')}>
				<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onToggle}>
					<Icon id='close' />
				</button>
				<div className="mModal__header">
					<h3 className="mModal__title">{title}</h3>
				</div>
				<div className="overflow-y-auto p-4 h-full">
					{content}
				</div>
				{footer && (
					<div className="mModal__footer">{footer}</div>
				)}
			</div>
		</dialog>,
		document.body
	)
}
