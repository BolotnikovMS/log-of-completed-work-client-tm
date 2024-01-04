import './../card.scss'

import cx from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { IPropsSmallCard } from './smallCard.interface'

export const SmallCard: React.FC<IPropsSmallCard> = ({ childrenContent, childrenFooter, childrenControl, className, cardText, path }) => {
  return (
    <div className={cx('card', className)}>
      {path && <Link to={path} className='card__link'/>}
      <div className="card__content">
				<div className="card__body">
					{childrenContent}
					<p className='card__text'>{cardText}</p>
				</div>
				{childrenFooter && 
					(<div className="card__footer">
						<p>{childrenFooter}</p>
					</div>)
				}
      </div>
      <div className="card__control card__control-row">
        {childrenControl}
      </div>
    </div>
  )
}
