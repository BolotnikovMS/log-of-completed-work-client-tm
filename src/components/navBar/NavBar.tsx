import './navbar.scss'

import { Link } from 'react-router-dom'
import React from 'react'

export const NavBar: React.FC = () => {

  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to='/'>Главная</Link>
        </li>
        <li>
          <Link to='/districts'>Районы и ГП</Link>
        </li>
        <li>
          <Link to='/substations'>ПС</Link>
        </li>
        <li>
          <Link to='/voltage-classes'>Классы U</Link>
        </li>
        <li>
          <Link to='/users'>Пользователи</Link>
        </li>
        <li>
          <Link to='/login'>Вход</Link>
        </li>
        <li>
          <Link to='/logout'>Выход</Link>
        </li>
      </ul>
    </nav>
  )
}
