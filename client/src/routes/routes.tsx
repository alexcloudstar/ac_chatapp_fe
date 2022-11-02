import { Rooms, ChatList, NotFound } from '@/components'

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
    component: (
      <>
        <Rooms />
        <ChatList />
      </>
    ),
  },
]
