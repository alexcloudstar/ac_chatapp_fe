import React, { FC } from 'react'

import './messagePreview.css'

import { Avatar } from '../Avatar'

type MessagePreviewProps = {
  user: {
    firstName: string
    lastName: string
  }
  message: string
  avatar: string
  time: string
}

export const MessagePreview: FC<MessagePreviewProps> = ({
  user,
  message,
  avatar,
  time,
}) => {
  return (
    <div className="mp_container">
      <div className="mp_inner-container">
        <Avatar user={user} avatar={avatar} />
        <div className="mp_username-message-container">
          <span className="mp_username">
            {user.firstName} {user.lastName}
          </span>
          <p className="mp_message">{message}</p>
        </div>
      </div>

      <span className="mp_time">{time}</span>
    </div>
  )
}
