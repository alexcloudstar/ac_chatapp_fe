import { useNavigate, useParams } from 'react-router-dom'

import { useCurrentUserQuery } from 'store/services/users'
import { Modal } from 'stories'
import { ReduxQueryType, User } from 'types'

import { Footer, Messages } from './components'

// TODO: Check if user don't have any punishment such as ban/mute
// TODO: if user have any punishment, show the punishment info and the time left for the punishment
// TODO: And do not allow user to send message

const Chat = () => {
  const navigate = useNavigate()
  const { roomId } = useParams<{ roomId: string }>()
  const { data: currentUser } = useCurrentUserQuery<ReduxQueryType<User>>()

  const onClose = () => navigate(-1)

  return (
    <>
      {currentUser?.punishments?.length &&
      currentUser.punishments.every(
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
            {currentUser?.punishments.map((punish) => {
              return (
                <p key={punish.id}>
                  Unforutantely, you have{' '}
                  <strong className="text-red-500">{punish.type}</strong>{' '}
                  {punish.duration} minutes from this chat
                </p>
              )
            })}
          </div>
        </Modal>
      ) : null}
      <div className="Chat h-[inherit] flex flex-col justify-between mt-20">
        <Messages />
        <Footer />
      </div>
    </>
  )
}

export default Chat
