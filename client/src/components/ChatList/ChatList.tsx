import { useConversationsQuery } from '@/store/services/conversations'

import { ApiState } from '../ApiState'

import styles from './chatlist.module.css'
import { Preview } from './components'
import { ConversationType } from './types'

const ChatList = () => {
  const {
    data: conversations,
    error,
    isLoading,
    refetch,
  } = useConversationsQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  if (error) return <ApiState errorMessage={error?.data?.message} />

  if (isLoading) return <ApiState />

  return (
    <div className={`${styles.container} pr-2`}>
      {conversations?.length ? (
        conversations.map((conversation: ConversationType, index) => {
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
              time={lastMessage.createdAt}
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
