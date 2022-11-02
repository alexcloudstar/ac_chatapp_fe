import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChatHeader, ChatList, Rooms } from './components'
import { HeaderLayout } from './Layouts'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem('accessToken')
  )

  return (
    <BrowserRouter>
      <HeaderLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <ChatHeader setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Rooms />
                <ChatList />
              </>
            }
          />
        </Routes>
      </HeaderLayout>
    </BrowserRouter>
  )
}

export default App
