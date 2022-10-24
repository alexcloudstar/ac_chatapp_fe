import { ApiState } from '../ApiState'

import styles from './chatlist.module.css'
import { Preview } from './components'
import { ConversationType } from './types'

import { useConversationsQuery } from '@/store/services/conversations'

const ChatList = () => {
  const { data: conversations, error, isLoading } = useConversationsQuery()

  if (error) return <ApiState errorMessage={error?.data?.message} />

  if (isLoading) return <ApiState />

  console.log(conversations)

  return (
    <div className={`${styles.container}`}>
      {conversations?.length ? (
        conversations.map((conversation: ConversationType) => {
          const lastMessage =
            conversation.messages[conversation.messages.length - 1]
          return (
            <Preview
              key={conversation.id}
              user={{
                avatar: 'https://i.pravatar.cc/150?img=1',
                username: lastMessage?.sender?.username,
              }}
              message={
                conversation.messages.length
                  ? lastMessage?.message
                  : 'No message yet'
              }
              time="12:00"
            />
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
