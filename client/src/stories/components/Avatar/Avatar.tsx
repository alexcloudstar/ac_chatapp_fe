import React, { FC } from 'react'

import { User } from '../../types'
import './avatar.css'

type AvatarProps = {
  user: User
  bgColor?: string
}

export const Avatar: FC<AvatarProps> = ({ user, bgColor }) => (
  <>
    {user.avatar ? (
      <img
        src={user.avatar}
        alt={`${`${user.firstName} ${user.lastName}` || ''} avatar`}
        className="avatar_profile-pic"
      />
    ) : (
      <span
        className="avatar_initials-avatar"
        style={{ backgroundColor: bgColor }}
      >
        {user.firstName[0]}
        {user.lastName[0]}
      </span>
    )}
  </>
)
