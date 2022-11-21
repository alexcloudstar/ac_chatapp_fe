import React from 'react'
import { Navigate } from 'react-router-dom'

import { useCurrentUserQuery } from 'store/services/users'
import { removeLocalStorage } from 'utils/localStorage'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, error, isLoading } = useCurrentUserQuery()

  if (!isLoading) {
    if ((!isLoading && error) || !user) {
      removeLocalStorage('accessToken')
      return <Navigate to="/auth" replace />
    }
  }

  return children
}
export default ProtectedRoute
