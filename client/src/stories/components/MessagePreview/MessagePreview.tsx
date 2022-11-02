import { FC } from 'react'

import './messagePreview.css'

import { UserComponentType } from '@/types'

import { Avatar } from '../Avatar'

type MessagePreviewProps = {
  user: UserComponentType
  message: string
  time: string
  classes?: string
}

export const MessagePreview: FC<MessagePreviewProps> = ({
  user,
  message,
  time,
  classes,
}) => (
  <div className={`mp_container ${classes ? classes : ''}`}>
    <div className="mp_inner-container">
      <Avatar user={user} />
      <div className="mp_username-message-container">
        <span className="mp_username">{user.username}</span>
        <p className="mp_message">{message}</p>
      </div>
    </div>

    <span className="mp_time">{time}</span>
  </div>
)
