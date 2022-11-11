import React from 'react'

import { Peeps, ChatList } from '@/components'
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn'

const Home = () => {
  useIsLoggedIn()

  return (
    <>
      <Peeps />
      <ChatList />
    </>
  )
}

export default Home
