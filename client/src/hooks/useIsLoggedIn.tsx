import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ConversationType } from '@/components/ChatList/types'
import { RootState } from '@/store'
import { useConversationsQuery } from '@/store/services/conversations'
import { useCurrentUserQuery } from '@/store/services/users'
import { setIsLoggedIn, setToken } from '@/store/slices/token'
import { ReduxQueryType, User } from '@/types'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'

export const useIsLoggedIn = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, token } = useSelector((state: RootState) => state.token)
  const navigate = useNavigate()

  const { error } = useCurrentUserQuery<ReduxQueryType<User>>()

  const { error: chatListError } = useConversationsQuery<
    ReduxQueryType<ConversationType[]>
  >(null, {
    refetchOnMountOrArgChange: true,
  })

  console.log(
    error?.data.error === 'tokenExpired',
    chatListError?.data.error === 'tokenExpired'
  )

  useEffect(() => {
    if (
      (!getLocalStorage('accessToken') &&
        error?.data.error === 'expiredToken') ||
      chatListError?.data.error === 'expiredToken'
    ) {
      // setLocalStorage('accessToken', '')
      localStorage.removeItem('accessToken')
      dispatch(setIsLoggedIn(false))
      dispatch(setToken(''))
      navigate('/auth')
    }
  }, [chatListError, dispatch, error, navigate])
}
