import React from 'react'
import './header.css'

type User = {
  name: string
}

type HeaderProps = {
  user?: User
  avatar: string
}

export const Header = ({ avatar, user }: HeaderProps) => {
  return (
    <div className="container">
      {user ? (
        <>
          <img
            src={avatar}
            alt={`${user?.name || ''} avatar`}
            className="profile-pic"
          />
          <h1 className="username">{user?.name}</h1>
        </>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  )
}
