import { useState } from 'react'

import { Auth, ChatHeader, ChatList, Rooms } from './components'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem('accessToken')
  )

  return (
    <div className="app-root">
      <div className="app--inner-root">
        {!isLoggedIn ? (
          <Auth setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <main className="flex flex-col w-[90%] lg:w-[70%]  h-[90%]	 pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787]/[70%] rounded-[40px] shadow-floating-container">
            <ChatHeader setIsLoggedIn={setIsLoggedIn} />
            <Rooms />
            <ChatList />
          </main>
        )}
      </div>
    </div>
  )
}

export default App
