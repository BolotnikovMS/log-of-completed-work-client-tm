import cx from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import './../card.scss'
import { IPropsCard } from './card.interface'

export const Card: FC<IPropsCard> = ({ childrenHeader, childrenContent, childrenFooter, childrenControl, className, classBody, path, ...attributes }) => {
  return (
    <div className={cx('mCard !w-full', className)} {...attributes}>
      {path && <Link to={path} className='card__link' />}
      <div className={cx('mCard__body', classBody)}>
        {childrenHeader && (
          <div className="mCard__header">
            {childrenHeader}
          </div>
        )}
        {childrenContent && (
          <div className="mCard__content">
            {childrenContent}
          </div>
        )}
        {childrenFooter && (
          <div className="mCard__footer">
            {childrenFooter}
          </div>
        )}
        {childrenControl && (
          <div className="mCard__actions">
            {childrenControl}
          </div>
        )}
      </div>
    </div>
  )
}
