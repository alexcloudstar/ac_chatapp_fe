import { User } from 'types'

import { Avatar } from '../Avatar'

type HeaderProps = {
  user?: Pick<User & { avatar?: string }, 'username' | 'avatar'>
  classes?: string
}

export const Header = ({ user, classes }: HeaderProps) => (
  <div className={`${classes || ''} flex h-fit items-center`}>
    {user ? (
      <>
        <Avatar user={user} />
        <h1 className="pl-3 text-[27px] font-normal">{user?.username}</h1>
      </>
    ) : (
      <h1>Please login</h1>
    )}
  </div>
)
