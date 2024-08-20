import { X } from 'lucide-react'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { IPropsModal } from './modal.interface'
import './modal.scss'

export const Modal: FC<IPropsModal> = ({ visible, title, content, footer, onToggle }) => {
  if (!visible) return null

  return createPortal(
    <div className='mModal' onClick={onToggle}>
      <div className="mModal__dialog" onClick={e => e.stopPropagation()}>
        <div className="mModal__header">
          <h3 className="mModal__title">{title}</h3>
          <span className="mModal__close" onClick={onToggle}>
            <X />
          </span>
        </div>
        <div className="overflow-y-auto">
          <div className="p-1">{content}</div>
        </div>
        {footer && (
          <div className="mModal__footer">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  )
}
