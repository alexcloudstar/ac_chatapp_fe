import { useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useCurrentUserQuery } from '@/store/services/users'
import { setIsLoggedIn, setToken } from '@/store/slices/token'
import { Button, Header, Modal, Search } from '@/stories'
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
          {location.pathname !== '/profile' ? (
            <div className="hide-mobile" onClick={onNavigateProfile}>
              <Header user={user} />
            </div>
          ) : (
            <span
              onClick={onNavigateBack}
              className="flex items-center ease-in duration-150 hover:text-red-500"
            >
              <MdOutlineKeyboardBackspace className="text-[30px] ml-8" />
              <span className="whitespace-nowrap	ml-3">Go back</span>
            </span>
          )}

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
            <FiLogOut className="text-[24px] ml-8" onClick={logout} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatHeader
