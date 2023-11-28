import './head-controller.scss'

import React from 'react'

interface IHeadControllersPage {
  title: string
  children: React.ReactNode
}

export const HeadControllersPage: React.FC<IHeadControllersPage> = ({ title, children }) => {
  return (
    <div className="headController">
      <div className="headController__content">
        <div className="headController__titles">
          <h2 className="title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
