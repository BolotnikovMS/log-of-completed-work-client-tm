import './substations.scss'

import React from 'react'

interface IPropsSubstationsPage {
  title: string
  children: React.ReactNode
}

export const SubstationsPage: React.FC<IPropsSubstationsPage> = ({ title, children }) => {
  return (
    <div className="substations">
      <div className="substations__content">
        <div className="substations__titles">
          <h2 className="title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
