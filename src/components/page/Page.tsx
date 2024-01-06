import './work-log.scss'

import { type FC } from 'react'
import { IPropsPage } from './page.interface'

export const Page: FC<IPropsPage> = ({ title, children }) => {
  return (
    <div className="work-log">
      <div className="work-log__content">
        <div className="work-log__titles">
          <h2 className="title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
