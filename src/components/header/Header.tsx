import './header.scss'

import { NavBar } from '../navBar/NavBar'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className="container">
        <div className='header__content'>
          <div className='header__logo'>Test task</div>
          <NavBar />
        </div>
      </div>
    </header>
  )
}
