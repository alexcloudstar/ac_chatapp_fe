import React, { FC } from 'react'

import './messagePreview.css'

import { User } from '../../types'
import { Avatar } from '../Avatar'

type MessagePreviewProps = {
  user: User
  message: string
  time: string
}

export const MessagePreview: FC<MessagePreviewProps> = ({
  user,
  message,
  time,
}) => (
  <div className="mp_container">
    <div className="mp_inner-container">
      <Avatar user={user} />
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
