import { lazy } from 'react'

import { Loading } from 'components'
import { ConversationType } from 'components/ChatList/types'
import { useGetConversationsQuery } from 'store/services/conversations'
import { useGetUsersQuery } from 'store/services/users'
import { ReduxQueryType, User } from 'types'

const ChatList = lazy(() => import('components/ChatList/ChatList'))
const Peeps = lazy(() => import('components/Peeps/Peeps'))

const Home = () => {
  const { isLoading: isLoadingUsers } =
    useGetUsersQuery<ReduxQueryType<User[]>>()
  const { isLoading: isLoadingConversations } = useGetConversationsQuery<
    ReduxQueryType<ConversationType[]>
  >(null, {
    refetchOnMountOrArgChange: true,
  })

  // if (isLoadingConversations || isLoadingUsers) return <Loading />

  return (
    <div className="flex flex-col items-start w-full h-full">
      <Peeps />
      <ChatList />
    </div>
  )
}

export default Home
