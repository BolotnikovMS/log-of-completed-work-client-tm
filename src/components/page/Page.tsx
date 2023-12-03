import './work-log.scss'

import { IPropsPage } from './page.interface'
import React from 'react'

export const Page: React.FC<IPropsPage> = ({ title, children }) => {
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
