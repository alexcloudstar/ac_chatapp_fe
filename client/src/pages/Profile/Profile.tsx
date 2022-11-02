import React from 'react'

import { useCurrentUserQuery } from '@/store/services/users'

const Profile = () => {
  const { data: user, error, isLoading } = useCurrentUserQuery()

  console.log(user)

  return <div>Profile</div>
}

export default Profile
