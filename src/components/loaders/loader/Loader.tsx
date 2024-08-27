import React from 'react'
import './loader.scss'

export const Loader: React.FC = () => {
  return (
    <div className='loader-spinner__wrapper'>
      <span className='loader-spinner !bg-blue-300'></span>
    </div>
  )
}
