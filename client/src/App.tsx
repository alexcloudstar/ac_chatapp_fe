import { useState } from 'react'

import { Auth, ChatHeader, ChatList, Rooms } from './components'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem('accessToken')
  )
  return (
    <>
      {!isLoggedIn ? (
        <Auth setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <main className="flex flex-col w-[375px] h-[812px] pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787] rounded-[40px]">
          <ChatHeader />
          <Rooms />
          <ChatList />
        </main>
      )}
    </>
  )
}

export default App
