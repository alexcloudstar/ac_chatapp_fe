import { lazy } from 'react'

const ChatList = lazy(() => import('components/ChatList/ChatList'))
const Peeps = lazy(() => import('components/Peeps/Peeps'))

const Home = () => {
  return (
    <div className="flex flex-col items-start w-full h-full">
      <Peeps />
      <ChatList />
    </div>
  )
}

export default Home
