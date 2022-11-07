import { useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useCurrentUserQuery } from '@/store/services/users'
import { setIsLoggedIn, setToken } from '@/store/slices/token'
import { Button, Header, Modal, Search } from '@/stories'
import { Icon } from '@/stories/components/Icon/Icon'
import { ReduxQueryType, User } from '@/types'
import { setLocalStorage } from '@/utils/localStorage'

import { ApiState } from '../ApiState'
import { CreateRoom } from '../CreateRoom'

import styles from './header.module.css'

const ChatHeader = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const location = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    data: user,
    error,
    isLoading,
  } = useCurrentUserQuery<ReduxQueryType<User>>()

  const toggleModal = () => setShowModal(!showModal)

  const logout = () => {
    setLocalStorage('accessToken', '')
    dispatch(setIsLoggedIn(false))
    dispatch(setToken(''))
    navigate('/')
  }

  const onNavigateBack = () => navigate(-1)

  const onNavigateProfile = () => navigate('/profile')

  if (error)
    return (
      <ApiState
        errorMessage={error?.data?.message}
        error={error?.data?.error}
      />
    )

  if (isLoading) return <ApiState />

  return (
    <>
      {showModal && (
        <Modal title="Create room" onClose={toggleModal} isSmall>
          <CreateRoom toggleModal={toggleModal} />
        </Modal>
      )}
      <div className={styles.container}>
        <div className="show-mobile mb-12" onClick={onNavigateProfile}>
          <Header user={user} classes="justify-center" />
        </div>
        <div className="flex justify-between items-center cursor-pointer">
          <div className="hide-mobile" onClick={onNavigateProfile}>
            {location.pathname !== '/profile' ? (
              <Header user={user} />
            ) : (
              <Icon
                icon={
                  <MdOutlineKeyboardBackspace className="text-[30px] ml-8" />
                }
                text="Go Back"
                textClasses="whitespace-nowrap	ml-3"
              />
            )}
          </div>

          <Search
            query=""
            placeholder="Search for chatrooms"
            icon={<FaSearch />}
            classes={styles.customInput}
          />
          <div className="flex items-center">
            <Button
              icon={<FaPlus />}
              classes={`${styles.btnCreateRoom} bg-blue-500  ease-in-out duration-300 hover:bg-blue-700`}
              onClick={toggleModal}
            />

            <Icon
              icon={<FiLogOut className="text-[24px] ml-8" />}
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatHeader
