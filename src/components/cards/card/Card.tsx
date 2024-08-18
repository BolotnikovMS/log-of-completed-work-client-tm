import cx from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import './../card.css'
import { IPropsCard } from './card.interface'

export const Card: FC<IPropsCard> = ({ childrenHeader, childrenBody, childrenFooter, childrenControl, className, path }) => {
  return (
    <div className={cx('card', className)}>
      {path && <Link to={path} className='card__link' />}
      <div className="card__content">
        <div className="card__header">
          {childrenHeader}
        </div>
        <div className="card__body">
          {childrenBody}
        </div>
        <div className="card__footer">
          {childrenFooter}
        </div>
      </div>
      <div className="card__control card__control-row">
        {childrenControl}
      </div>
    </div>
  )
}
