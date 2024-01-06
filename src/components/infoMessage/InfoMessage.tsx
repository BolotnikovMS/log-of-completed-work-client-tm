import './info-message.scss'

import { type FC } from 'react'

interface IPropsInfoMessage {
  text: string
}

const InfoMessage: FC<IPropsInfoMessage> = ({ text }) => {
  return (
    <div className='info-message'>
      <div className='info-message__text'>{text}</div>
    </div>
  )
}

export default InfoMessage