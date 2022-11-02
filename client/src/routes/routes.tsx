import { NotFound } from '@/components'
import { Home, Profile } from '@/pages'

export type RoutesType = {
  key: string
  path: string
  component: React.ReactNode
}

export const routes: RoutesType[] = [
  {
    key: 'not_found',
    path: '*',
    component: <NotFound />,
  },
  {
    key: 'home',
    path: '/',
    component: <Home />,
  },
  {
    key: 'profile',
    path: '/profile',
    component: <Profile />,
  },
]
