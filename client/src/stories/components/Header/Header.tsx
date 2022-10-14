import React from 'react'

import { User } from '../../types'
import { Avatar } from '../Avatar'
import './header.css'

type HeaderProps = {
  user?: User
}

export const Header = ({ user }: HeaderProps) => (
  <div className="header_container">
    {user ? (
      <>
        <Avatar user={user} />
        <h1 className="header_username">
          {user?.firstName} {user?.lastName}
        </h1>
      </>
    ) : (
      <h1>Please login</h1>
    )}
  </div>
)
