import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChatHeader } from '@/components'
import { HeaderLayout } from '@/Layouts'

import { routes } from './routes'

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem('accessToken')
  )

  return (
    <BrowserRouter>
      <HeaderLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <ChatHeader setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Routes>
      </HeaderLayout>
    </BrowserRouter>
  )
}

export default Router
