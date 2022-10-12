import React from 'react'

import { Avatar } from '../Avatar'
import './header.css'

type User = {
  firstName: string
  lastName: string
}

type HeaderProps = {
  user?: User
  avatar: string
}

export const Header = ({ avatar, user }: HeaderProps) => {
  return (
    <div className="header_container">
      {user ? (
        <>
          <Avatar avatar={avatar} user={user} />
          <h1 className="header_username">
            {user?.firstName} {user?.lastName}
          </h1>
        </>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  )
}
