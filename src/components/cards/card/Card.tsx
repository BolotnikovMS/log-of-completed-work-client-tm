import cx from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import './../card.scss'
import { IPropsCard } from './card.interface'

export const Card: FC<IPropsCard> = ({ childrenHeader, childrenContent, childrenFooter, childrenControl, className, path }) => {
  return (
    <div className={cx('mCard !w-full', className)}>
      {path && <Link to={path} className='card__link' />}
      <div className="mCard__body">
        {childrenHeader && (
          <div className="card__header">
            {childrenHeader}
          </div>
        )}
        {childrenContent && (
          <div className="mCard__content">
            {childrenContent}
          </div>
        )}
        {childrenFooter && (
          <div className="card__footer">
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
