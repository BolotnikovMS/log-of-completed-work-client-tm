import './../card.css'
// import cx from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './../card.module.css'
import { IPropsSmallCard } from './smallCard.interface'

export const SmallCard: React.FC<IPropsSmallCard> = ({ childrenContent, childrenControl, path }) => {
  return (
    <div className={styles.mCard}>
      {path && <Link to={path} className={styles.mCardLink} />}
      <div className={styles.mCardBody}>
        <div className={styles.mCardContent}>
          {childrenContent && (
            childrenContent
          )}
        </div>
        {childrenControl && (
          <div className={styles.mCardActions}>
            {childrenControl}
          </div>
        )}
      </div>
    </div>
  )
}
