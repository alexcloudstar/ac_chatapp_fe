import { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

import { Loading } from 'components'
import { ConversationType } from 'components/ChatList/types'
import { API_URL } from 'config/env'
import {
  useGetConversationQuery,
  useGetConversationsQuery,
} from 'store/services/conversations'
import { useCurrentUserQuery } from 'store/services/users'
import { ReduxQueryType, User } from 'types'

import { routes } from './routes'

const socket = io(API_URL)

const App = () => {
  const { roomId } = useParams()
  const parsedRoomId = roomId ? +roomId : -1

  const { isLoading: isLoadingConversation } = useGetConversationQuery<
    ReduxQueryType<ConversationType>
  >({
    roomId: parsedRoomId,
  })

  const { data: currentUser, isLoading: isLoadingUser } =
    useCurrentUserQuery<ReduxQueryType<User>>()

  const { isLoading: isLoadingConversations } = useGetConversationsQuery<
    ReduxQueryType<ConversationType[]>
  >(null, {
    refetchOnMountOrArgChange: true,
  })

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

  if (
    (currentUser && isLoadingUser) ||
    isLoadingConversations ||
    isLoadingConversation
  )
    return <Loading />

  return (
    <main className="flex flex-col justify-center items-center w-full h-full bg-[#596787]/[70%]">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={route.component}
              />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </main>
  )
}

export default App
