/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Fragment,
  lazy,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

import { ConversationType, MessagesType } from 'components/ChatList/types'
import { API_URL } from 'config/env'
import { useGetConversationQuery } from 'store/services/conversations'
import {
  useDeleteMessageMutation,
  useGetRoomMessagesQuery,
} from 'store/services/messages'
import { useCurrentUserQuery } from 'store/services/users'
import { type ReduxQueryType, type RemoveMessageType, type User } from 'types'

const Message = lazy(() =>
  import('../Message').then(({ Message }) => ({ default: Message }))
)

const Avatar = lazy(() =>
  import('stories').then(({ Avatar }) => ({ default: Avatar }))
)

const Icon = lazy(() =>
  import('stories/components').then(({ Icon }) => ({ default: Icon }))
)

const socket = io(API_URL)

const Messages = () => {
  const { roomId } = useParams()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messagesState, setMessagesState] = useState<MessagesType[]>([])
  const [isTyping, setIsTyping] = useState<{
    isTyping: boolean
    user: {
      id: number
      username: string
    }
  }>({
    isTyping: false,
    user: {
      id: -1,
      username: '',
    },
  })

  const parsedRoomId = roomId ? +roomId : -1

  const { data: messages, refetch } = useGetRoomMessagesQuery<
    ReduxQueryType<MessagesType[]>
  >(
    { roomId: parsedRoomId },
    {
      refetchOnMountOrArgChange: false,
    }
  )

  const { data: conversation } = useGetConversationQuery<
    ReduxQueryType<ConversationType>
  >({ roomId: parsedRoomId })

  const [deleteMessage] =
    useDeleteMessageMutation<ReduxQueryType<RemoveMessageType>>()

  const { data: user } = useCurrentUserQuery<ReduxQueryType<User>>()

  const onDeleteMessage = async (messageId: RemoveMessageType['messageId']) => {
    await deleteMessage({
      roomId: parsedRoomId,
      messageId: messageId.toString(),
    })

    const delMessage = messagesState.find(
      (message: MessagesType) => +message.id === +messageId
    )

    setMessagesState((prev: MessagesType[]) =>
      prev.filter((message: MessagesType) => message !== delMessage)
    )
  }

  useLayoutEffect(() => {
    if (messages) {
      setMessagesState(messages)
    }
  }, [messages])

  useLayoutEffect(() => {
    socket.once('chat', (data: MessagesType) => {
      setMessagesState([...messagesState, data])
    })

    refetch()

    return () => {
      socket.off('chat')
    }
  }, [messagesState, refetch])

  useLayoutEffect(() => {
    socket.on(
      'typing',
      (data: { sender: Pick<User, 'id' | 'username' | 'name'> }) => {
        setIsTyping({
          isTyping: true,
          user: {
            id: data.sender.id,
            username: data.sender.name || data.sender.username,
          },
        })
      }
    )

    return () => {
      socket.off('typing')
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesState])

  return (
    <div className="messages overflow-y-auto pr-[30px]">
      {messagesState?.map((message) => {
        const isProfanityWord = conversation?.profanityWords.some(
          (pWord) => pWord === message.message
        )

        const checkedMessage = isProfanityWord
          ? {
              ...message,
              message: '****',
            }
          : message

        return (
          <Fragment key={message.id}>
            <div
              className={`flex mt-6 mb-6 ${
                user?.id === message.senderId ? 'justify-start' : 'justify-end'
              } group`}
            >
              {user?.id === message.senderId && (
                <Icon
                  icon={
                    <FaTrashAlt className="text-[20px] mr-8 hidden group-hover:block cursor-pointer" />
                  }
                  onClick={() => onDeleteMessage(message.id.toString())}
                />
              )}
              <Avatar user={message.sender} classes="mr-2" />
              <Message message={checkedMessage} />
            </div>
          </Fragment>
        )
      })}
      {user?.id !== isTyping?.user.id && isTyping.isTyping && (
        <div>{isTyping.user.username} is typing...</div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

export default Messages
