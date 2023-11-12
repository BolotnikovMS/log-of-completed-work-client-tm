import './badge.scss'

import React from 'react'

interface IPropsBadge {
  text: string
}

export const Badge: React.FC<IPropsBadge> = ({ text }) => {
  return (
    <span className="badge">{text}</span>
  )
}
