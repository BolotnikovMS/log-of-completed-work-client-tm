import cx from 'classnames'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '..'
import { IPropsModal } from './modal.interface'
import './modal.scss'

export const Modal: FC<IPropsModal> = ({ visible, title, content, footer, classDialog, onToggle }) => {
	if (!visible) return null

	return createPortal(
		<div className='mModal'>
			<div className={cx('mModal__dialog min-w-[650px]', classDialog)} onClick={e => e.stopPropagation()}>
				<div className="mModal__header">
					<h3 className="mModal__title">{title}</h3>
					<span className="mModal__close" onClick={onToggle}>
						<Icon id='close' />
					</span>
				</div>
				<div className="overflow-y-auto p-4 h-full">
					{content}
				</div>
				{footer && (
					<div className="mModal__footer">{footer}</div>
				)}
			</div>
		</div>,
		document.body
	)
}
