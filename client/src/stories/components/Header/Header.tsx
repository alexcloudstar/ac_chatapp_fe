import React from 'react'

import { User } from '../../types'
import { Avatar } from '../Avatar'
import './header.css'

type HeaderProps = {
  user?: User
  classes?: string
}

export const Header = ({ user, classes }: HeaderProps) => (
  <div className={`${classes || ''} flex h-fit`}>
    {user ? (
      <>
        <Avatar user={user} />
        <h1 className="header_username">{user?.username}</h1>
      </>
    ) : (
      <h1>Please login</h1>
    )}
  </div>
)
