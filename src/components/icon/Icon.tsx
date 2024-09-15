import cx from 'classnames'
import { memo, type FC } from 'react'
import spriteIcons from './../../icons/sprite.svg'
import { IPropsIcon } from './icon.interface'

const Icon: FC<IPropsIcon> = memo(({ id, className }) => {
  if (!id) {
    console.error('Не передан id иконки!')

    return null
  }

  return (
    <svg className={cx('icon', className)}>
      <use xlinkHref={`${spriteIcons}#icon-${id}`} />
    </svg>
  )
})

export default Icon
