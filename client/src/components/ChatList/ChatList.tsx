import { useCallback, useEffect, useState } from 'react'

import styles from './chatlist.module.css'
import { Preview } from './components'

import { User } from '@/stories/types'
import { API_METHODS } from '@/types'
import { fetchAPI } from '@/utils/api'
import { getLocalStorage } from '@/utils/localStorage'

type MessagesType = {
  id: number
  message: string
  senderId: number
  sender: Pick<User, 'id' | 'username' | 'avatar'>
}

type ConversationType = {
  id: string
  isPrivate: boolean
  messages: MessagesType[]
  name: string
  profanityWords: string[]
  userOwnerId: number
  users: Pick<User, 'id'>[]
}

const ChatList = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([])
  const [senderUser, setSenderUser] = useState<User | null>(null)

  const getChatrooms = useCallback(async () => {
    try {
      const APIData: ConversationType[] = await fetchAPI(
        'http://localhost:4000/chatrooms/joined',
        API_METHODS.GET,
        getLocalStorage('accessToken') || ''
      )

      setConversations(APIData)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    getChatrooms()
  }, [getChatrooms])

  return (
    <div className={`${styles.container}`}>
      {conversations?.map((conversation) => {
        return (
          <Preview
            key={conversation.id}
            user={{
              avatar: 'https://i.pravatar.cc/150?img=1',
              username:
                conversation.messages[conversation?.messages.length - 1]?.sender
                  ?.username,
            }}
            message={
              conversation.messages.length
                ? conversation?.messages[conversation?.messages.length - 1]
                    ?.message
                : 'No message yet'
            }
            time="12:00"
          />
        )
      })}
    </div>
  )
}

export default ChatList
