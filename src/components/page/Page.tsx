import './work-log.scss'

import cx from 'classnames'
import { type FC } from 'react'
import { IPropsPage } from './page.interface'

export const Page: FC<IPropsPage> = ({ title, children, classTitle }) => {
  return (
    <div className="work-log">
      <div className="work-log__content">
        <div className="work-log__titles">
          <h2 className={cx('title', classTitle)}>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
