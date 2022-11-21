import { useConversationsQuery } from 'store/services/conversations'
import { ReduxQueryType } from 'types'

import styles from './chatlist.module.css'
import { Preview } from './components'
import { ConversationType } from './types'

const ChatList = () => {
  const { data: conversations } = useConversationsQuery<
    ReduxQueryType<ConversationType[]>
  >(null, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <div className={`${styles.container} pr-2 w-full`}>
      {conversations?.length ? (
        conversations.map((conversation: ConversationType) => {
          const lastMessage =
            conversation.messages[conversation.messages.length - 1]

          const lastMessageTime = new Date(
            lastMessage.createdAt
          ).toLocaleString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit',
          })

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
              time={lastMessageTime}
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
