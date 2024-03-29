/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Floating } from 'Layouts'
import { Home, NotFound, Profile, Auth, Chat, PeepProfile } from 'pages'

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
      // @ts-ignore
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
      // @ts-ignore
      <ProtectedRoute>
        <Floating>
          <Profile />
        </Floating>
      </ProtectedRoute>
    ),
  },
  {
    key: 'chat',
    path: '/chat/:roomId',
    component: (
      // @ts-ignore
      <ProtectedRoute>
        <Floating>
          <Chat />
        </Floating>
      </ProtectedRoute>
    ),
  },
  {
    key: 'peepProfile',
    path: '/profile/:username',
    component: (
      // @ts-ignore
      <ProtectedRoute>
        <Floating>
          <PeepProfile />
        </Floating>
      </ProtectedRoute>
    ),
  },
  {
    key: 'not_found',
    path: '*',
    component: (
      // @ts-ignore
      <ProtectedRoute>
        <NotFound />
      </ProtectedRoute>
    ),
  },
]
