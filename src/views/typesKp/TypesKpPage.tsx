import './type-kp.scss'

import React from 'react'

interface ITypesKpPage {
  title: string
  children: React.ReactNode
}

export const TypesKpPage: React.FC<ITypesKpPage> = ({ title, children }) => {
  return (
    <div className="typeKp">
      <div className="typeKp__content">
        <div className="typeKp__titles">
          <h2 className="title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
