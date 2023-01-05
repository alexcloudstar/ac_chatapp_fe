import { useParams } from 'react-router-dom'

import { Punishments } from 'components'
import { useCurrentUserQuery, useGetUserQuery } from 'store/services/users'
import { Avatar } from 'stories'
import { ReduxQueryType, User } from 'types'

import { Admin } from './components'

const PeepProfile = () => {
  const { username } = useParams<{ username: string }>()

  const { data: user, isLoading } = useGetUserQuery<ReduxQueryType<User>>(
    username ?? ''
  )

  const { data: currentUser } = useCurrentUserQuery<ReduxQueryType<User>>()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex justify-center flex-col items-center mt-8">
      <h1 className="mb-4 font-bold">{user?.username}</h1>
      <Avatar user={user} width={120} height={120} classes="mb-5" />

      {currentUser && currentUser.isAdmin && (
        <Punishments punishments={user?.punishments} />
      )}

      <div>
        {user?.name && (
          <p className="mb-2">
            <span className="font-bold">Name:</span> {user.name}
          </p>
        )}
        <p className="mb-2">
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p className="mb-2">
          <span className="font-bold">Username:</span> {user.username}
        </p>
        <p className="mb-2">
          <span className="font-bold">Online status:</span>{' '}
          <span
            className={`online-status ${
              user?.isOnline ? 'bg-[#7cd452]' : 'bg-white'
            } w-3.5 h-3.5 rounded-[50px] inline-block`}
          ></span>
        </p>
        {currentUser?.isAdmin && <Admin />}
      </div>
    </div>
  )
}

export default PeepProfile
