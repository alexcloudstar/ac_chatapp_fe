import { ChatList, Peeps } from 'components'

const Home = () => {
  return (
    <div className="flex flex-col items-start w-full h-full">
      <Peeps />
      <ChatList />
    </div>
  )
}

export default Home
