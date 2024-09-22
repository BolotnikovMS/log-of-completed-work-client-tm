import cx from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import './../card.scss'
import { IPropsSmallCard } from './smallCard.interface'

export const SmallCard: React.FC<IPropsSmallCard> = ({ childrenContent, childrenControl, path, classContent }) => {
  return (
    <div className='mCard'>
      {path && <Link to={path} className='mCard__link' />}
      <div className='mCard__body'>
        {childrenContent && (
          <div className={cx('mCard__content', classContent)}>
            {childrenContent}
          </div>
        )}
        {childrenControl && (
          <div className='mCard__actions'>
            {childrenControl}
          </div>
        )}
      </div>
    </div>
  )
}
