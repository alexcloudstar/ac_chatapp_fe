import { Home, NotFound, Profile, Auth } from '@/pages'

import ProtectedRoute from './ProtectedRoute'

export type RoutesType = {
  key: string
  path: string
  component: React.ReactNode
}

export const routes: RoutesType[] = [
  {
    key: 'auth',
    path: '/auth',
    component: <Auth />,
  },
  {
    key: 'home',
    path: '/',
    component: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    key: 'profile',
    path: '/profile',
    component: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    key: 'not_found',
    path: '*',
    component: (
      <ProtectedRoute>
        <NotFound />
      </ProtectedRoute>
    ),
  },
]
