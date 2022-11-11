import { Home, NotFound, Profile, Auth } from '@/pages'

export type RoutesType = {
  key: string
  path: string
  component: () => React.ReactNode
}

export const routes: RoutesType[] = [
  {
    key: 'auth',
    path: '/auth',
    component: Auth,
  },
  {
    key: 'home',
    path: '/',
    component: Home,
  },
  {
    key: 'profile',
    path: '/profile',
    component: Profile,
  },
  {
    key: 'not_found',
    path: '*',
    component: NotFound,
  },
]
