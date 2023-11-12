import './info-message.scss'

import React from 'react'

interface IPropsInfoMessage {
  text: string
}

export const InfoMessage: React.FC<IPropsInfoMessage> = ({ text }) => {
  return (
    <div className='info-message'>
      <div className='info-message__text'>{text}</div>
    </div>
  )
}
