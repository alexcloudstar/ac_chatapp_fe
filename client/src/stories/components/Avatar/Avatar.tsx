import React, { FC } from 'react'
import './avatar.css'

type AvatarProps = {
  avatar?: string
  user: {
    firstName: string
    lastName: string
  }
  bgColor?: string
}

export const Avatar: FC<AvatarProps> = ({ avatar, user, bgColor }) => {
  return (
    <>
      {avatar ? (
        <img
          src={avatar}
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
}
