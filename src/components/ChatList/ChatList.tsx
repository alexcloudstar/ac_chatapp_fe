import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'store'
import { useGetConversationsQuery } from 'store/services/conversations'
import { ReduxQueryType } from 'types'

import styles from './chatlist.module.css'
import { Preview } from './components'
import { ConversationType } from './types'

const ChatList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const conversationsState = useAppSelector((state) => state.conversations)

  const { data: conversations } = useGetConversationsQuery<
    ReduxQueryType<ConversationType[]>
  >(null, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (conversations) {
      dispatch({
        type: 'conversations/setConversations',
        payload: conversations,
      })
    }
  }, [conversations, dispatch])

  const onConversationClick = (conversationId: string) => {
    navigate(`/chat/${conversationId}`)
  }

  return (
    <div className={`${styles.container} pr-2 w-full`}>
      {conversationsState?.length ? (
        conversationsState.map((conversation: ConversationType) => {
          const lastMessage =
            conversation.messages[conversation.messages.length - 1]

          const lastMessageTime = new Date(
            lastMessage.createdAt
          ).toLocaleString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit',
          })

          return (
            <div
              className="cursor-pointer"
              key={conversation.id}
              onClick={() => onConversationClick(conversation.id)}
            >
              <Preview
                conversationName={conversation.name}
                user={{
                  avatar: 'https://i.pravatar.cc/150?img=1',
                  username: lastMessage?.sender?.username,
                }}
                message={
                  conversation.messages.length
                    ? lastMessage?.message
                    : 'No message yet'
                }
                time={lastMessageTime}
              />
            </div>
          )
        })
      ) : (
        <p className="text-[20px] font-semibold	">
          You have no conversation yet
        </p>
      )}
    </div>
  )
}

export default ChatList
