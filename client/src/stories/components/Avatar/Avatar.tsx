import React, { FC } from 'react'

import { User } from '../../types'
import './avatar.css'

type AvatarProps = {
  user: User
  bgColor?: string
  classes?: string
}

export const Avatar: FC<AvatarProps> = ({
  user,
  bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  classes,
}) => (
  <div className={classes ? classes : ''}>
    {user?.avatar ? (
      <img
        src={user?.avatar}
        alt={`${`${user.username}` || ''} avatar`}
        className="avatar_profile-pic"
      />
    ) : (
      <span
        className="avatar_initials-avatar"
        style={{ backgroundColor: bgColor }}
      >
        {user.username[0]}
      </span>
    )}
  </div>
)
