import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { io } from 'socket.io-client'

import { API_URL } from 'config/env'
import { useCurrentUserQuery } from 'store/services/users'
import { ReduxQueryType, User } from 'types'

import { routes } from './routes'

const socket = io(API_URL)

const App = () => {
  const { data: currentUser } = useCurrentUserQuery<ReduxQueryType<User>>()

  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        socket.emit('isOnline', {
          userId: currentUser?.id,
          isOnline: true,
        })
      }, 3 * 60 * 1000)
    }

    const handleBlur = () => {
      setTimeout(() => {
        socket.emit('isOnline', {
          userId: currentUser?.id,
          isOnline: false,
        })
      }, 5 * 60 * 1000)
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [currentUser?.id])

  return (
    <main className="flex flex-col justify-center items-center w-full h-full bg-[#596787]/[70%]">
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
