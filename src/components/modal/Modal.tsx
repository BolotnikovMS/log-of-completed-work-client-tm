import './modal.scss'

import React, { useEffect } from 'react'

import { IPropsModal } from './modal.interface'

export const Modal: React.FC<IPropsModal> = ({ visible, title, content, footer, onClose }) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)

    return () => document.removeEventListener('keydown', onKeydown)
  })

  if (!visible) return null

  return (
    <div className='modal' onClick={onClose}>
      <div className="modal__dialog" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <span className="modal__close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal__body">
          <div className="modal__content">{content}</div>
        </div>
        {footer && (
          <div className="modal__footer">{footer}</div>
        )}
      </div>
    </div>
  )
}
