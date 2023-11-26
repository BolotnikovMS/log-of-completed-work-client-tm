import './voltage-classes.scss'

import React from 'react'

interface IPropsVoltageClassesPage {
  title: string
  children: React.ReactNode
}

export const VoltageClassesPage: React.FC<IPropsVoltageClassesPage> = ({ title, children }) => {
  return (
    <div className="voltage">
      <div className="voltage__content">
        <div className="voltage__titles">
          <h2 className="title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
