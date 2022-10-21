import { useCallback, useEffect, useState } from 'react'

import styles from './chatlist.module.css'
import { Preview } from './components'

import { User } from '@/stories/types'
import { API_METHODS } from '@/types'
import { fetchAPI } from '@/utils/api'
import { getLocalStorage } from '@/utils/localStorage'

const ChatList = () => {
  const [conversations, setConversations] = useState<any[]>([])

  const getChatrooms = useCallback(async () => {
    const APIData: any[] = await fetchAPI(
      'http://localhost:4000/chatrooms/joined',
      API_METHODS.GET,
      getLocalStorage('accessToken') || ''
    )

    setConversations(APIData)
  }, [])

  useEffect(() => {
    getChatrooms()
  }, [getChatrooms])

  console.log(conversations)

  return (
    <div className={`${styles.container}`}>
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
    </div>
  )
}

export default ChatList
