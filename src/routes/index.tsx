import { Floating } from 'Layouts'
import { Home, NotFound, Profile, Auth } from 'pages'

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
        <Floating>
          <Home />
        </Floating>
      </ProtectedRoute>
    ),
  },
  {
    key: 'profile',
    path: '/profile',
    component: (
      <ProtectedRoute>
        <Floating>
          <Profile />
        </Floating>
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
