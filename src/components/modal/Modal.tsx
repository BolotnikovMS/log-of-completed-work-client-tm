import './modal.scss'

import { X } from 'lucide-react'
import { type FC } from 'react'
import { createPortal } from 'react-dom'
import { IPropsModal } from './modal.interface'

export const Modal: FC<IPropsModal> = ({ visible, title, content, footer, onToggle }) => {
  if (!visible) return null

  return createPortal(
    <div className='modal' onClick={onToggle}>
      <div className="modal__dialog" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <span className="modal__close" onClick={onToggle}>
						<X />
					</span>
        </div>
        <div className="modal__body">
          <div className="modal__content">{content}</div>
        </div>
        {footer && (
          <div className="modal__footer">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  )
}