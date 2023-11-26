import './small-card.scss'

import { IPropsSmallCard } from './smallCard.interface'
import { Link } from 'react-router-dom'
import React from 'react'
import cx from 'classnames'

export const SmallCard: React.FC<IPropsSmallCard> = ({ childrenContent, childrenControl, className, cardText, path }) => {
  return (
    <div className={cx('card', className)}>
      {path && <Link to={path} className='card__link'/>}
      <div className="card__content">
        {childrenContent}
        <p className='card__text'>{cardText}</p>
      </div>
      <div className="card__control card__control-row">
        {childrenControl}
      </div>
    </div>
  )
}
