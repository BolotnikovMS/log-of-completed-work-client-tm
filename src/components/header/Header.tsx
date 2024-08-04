import React from 'react'
import { NoteDone } from '../../icons'
import { NavBar } from '../navBar/NavBar'
import './header.scss'

export const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className="container">
        <div className='header__content'>
          <div className='header__logo'>
            <NoteDone />
          </div>
          <NavBar />
        </div>
      </div>
    </header>
  )
}
