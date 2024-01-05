import './header.scss'

import { BookCheck } from 'lucide-react'
import React from 'react'
import { NavBar } from '../navBar/NavBar'

export const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className="container">
        <div className='header__content'>
          <div className='header__logo'>
						<BookCheck />
					</div>
          <NavBar />
        </div>
      </div>
    </header>
  )
}
