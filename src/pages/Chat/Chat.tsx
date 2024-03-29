import { lazy } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useCurrentUserQuery } from 'store/services/users'
import { type ReduxQueryType, type User } from 'types'

const Footer = lazy(() => import('./components/Footer/Footer'))
const Messages = lazy(() => import('./components/Messages/Messages'))
const Modal = lazy(() =>
  import('stories/components/Modal/Modal').then(({ Modal }) => ({
    default: Modal,
  }))
)

const Chat = () => {
  const navigate = useNavigate()
  const { roomId } = useParams<{ roomId: string }>()
  const { data: currentUser } = useCurrentUserQuery<ReduxQueryType<User>>()

  const onClose = () => navigate(-1)

  return (
    <>
      {currentUser?.punishments?.length &&
      currentUser.punishments.some(
        (punish) => punish.chatroomId === parseInt(roomId ?? '-1')
      ) ? (
        <Modal
          title="You don't have access to that chat"
          onClose={onClose}
          hasFooter
          footerContent={
            <>
              <button
                className="text-sm mb-10 bg-green-700 p-3 rounded-md"
                onClick={onClose}
              >
                Go back
              </button>
            </>
          }
        >
          <div className="flex flex-col items-center justify-center h-full">
            <p>
              Unfortunately you have{' '}
              <strong className="text-red-500">punishment</strong>, visit your
              profile for more informations
            </p>
          </div>
        </Modal>
      ) : null}
      <div className="Chat h-[inherit] flex flex-col justify-between mt-[3rem]">
        <Messages />
        <Footer />
      </div>
    </>
  )
}

export default Chat
