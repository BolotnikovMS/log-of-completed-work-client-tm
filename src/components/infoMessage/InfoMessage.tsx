import { type FC } from 'react'
import './info-message.scss'

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
