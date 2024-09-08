import cx from 'classnames'
import { type FC } from 'react'
import spriteIcons from './../../icons/sprite.svg'

interface IPropsIcon {
  id: string
  className?: string
}

const Icon: FC<IPropsIcon> = ({ id, className }) => {
  return (
    <svg className={cx('icon', className)}>
      <use href={`${spriteIcons}#icon-${id}`} />
    </svg>
  )
}

export default Icon
