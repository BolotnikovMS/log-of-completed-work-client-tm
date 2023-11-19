import './district.scss'

import React from 'react'

interface IPropsDistrictsPage {
  title: string
  children: React.ReactNode
}

export const DistrictsPage: React.FC<IPropsDistrictsPage> = ({ title, children }) => {  
  return (
    <div className="districts">
      <div className="districts__content">
        <div className="districts__titles">
          <h2 className="title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
