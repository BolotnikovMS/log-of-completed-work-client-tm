import './small-card.scss'

import { IPropsSmallCard } from './smallCard.interface'
import React from 'react'
import cx from 'classnames'

export const SmallCard: React.FC<IPropsSmallCard> = ({ children, className, cardText }) => {
  return (
    <div className={cx('card', className)}>
      <a href="!#" className='card__link'></a>
      <div className="card__content">
        {children}
        <p className='card__text'>{cardText}</p>
      </div>
      <div className="card__control">Edit / Delete</div>
    </div>
  )
}
