import cx from 'classnames'
import { type FC } from 'react'
import { joinClasses } from '../../helpers/joinClasses.helper'
import { IPropsGroup } from './group.interface'
import styles from './group.module.scss'

const Group: FC<IPropsGroup> = ({ className, children, ...attributes }) => {
  return (
    <div className={cx(styles.group, joinClasses(styles, className))} {...attributes}>
      {children}
    </div>
  )
}

export default Group