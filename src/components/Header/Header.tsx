import { lazy, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

import { Header as ConversationHeader } from 'pages/Chat/components'
import { useCurrentUserQuery } from 'store/services/users'
import { type ReduxQueryType, type User } from 'types'
import { removeLocalStorage } from 'utils/localStorage'

import { useSignoutMutation } from '../../store/services/auth'

const SearchBar = lazy(() =>
  import('components/SearchBar').then(({ SearchBar }) => ({
    default: SearchBar,
  }))
)

const CreateRoom = lazy(() =>
  import('../CreateRoom').then(({ CreateRoom }) => ({ default: CreateRoom }))
)
const Icon = lazy(() =>
  import('stories/components/Icon/Icon').then(({ Icon }) => ({ default: Icon }))
)

const Button = lazy(() =>
  import('stories/components/Button/Button').then(({ Button }) => ({
    default: Button,
  }))
)

const Header = lazy(() =>
  import('stories/components/Header/Header').then(({ Header }) => ({
    default: Header,
  }))
)

const Modal = lazy(() =>
  import('stories/components/Modal/Modal').then(({ Modal }) => ({
    default: Modal,
  }))
)

import styles from './header.module.css'

const ChatHeader = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const location = useLocation()

  const navigate = useNavigate()

  const { data: user } = useCurrentUserQuery<ReduxQueryType<User>>()

  const [signout] = useSignoutMutation()

  const toggleModal = () => setShowModal(!showModal)

  const logout = async () => {
    await signout(user?.id)

    removeLocalStorage('accessToken')
    navigate('/auth')
  }

  const onNavigateBack = () => navigate(-1)

  const onNavigateProfile = () => navigate('/profile')

  const headerPathQuery =
    !location.pathname.includes('profile') &&
    !location.pathname.includes('chat')

  return (
    <>
      {showModal && (
        <Modal title="Create room" onClose={toggleModal} isSmall>
          <CreateRoom toggleModal={toggleModal} />
        </Modal>
      )}
      <header className={styles.container}>
        <div className="show-mobile mb-12" onClick={onNavigateProfile}>
          <Header user={user} classes="justify-center" />
        </div>
        <div className="flex justify-between items-center cursor-pointer">
          <div onClick={onNavigateProfile}>
            {!location.pathname.includes('/profile') ? (
              <div className="hide-mobile">
                <Header user={user} />
              </div>
            ) : (
              <Icon
                icon={
                  <MdOutlineKeyboardBackspace className="text-[30px] ml-8" />
                }
                onClick={onNavigateBack}
                text="Go Back"
                textClasses="whitespace-nowrap	ml-3"
              />
            )}
          </div>

          {headerPathQuery ? <SearchBar /> : <ConversationHeader />}
          <div className="flex items-center">
            {!location.pathname.includes('/profile') && (
              <Button
                icon={<FaPlus />}
                classes={`${styles.btnCreateRoom} bg-blue-500 ease-in-out duration-300 hover:bg-blue-700`}
                onClick={toggleModal}
              />
            )}

            <Icon
              icon={<FiLogOut className="text-[24px] ml-8" />}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={logout}
            />
          </div>
        </div>
      </header>
    </>
  )
}

export default ChatHeader
