import { FC, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { useCurrentUserQuery } from '@/store/services/users'
import { Button, Header, Modal, Search } from '@/stories'
import { setLocalStorage } from '@/utils/localStorage'

import { ApiState } from '../ApiState'
import { AuthProps } from '../Auth/types'
import { CreateRoom } from '../CreateRoom'

import styles from './header.module.css'

const ChatHeader: FC<AuthProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState<boolean>(false)

  const { data: user, error, isLoading } = useCurrentUserQuery()

  const toggleModal = () => setShowModal(!showModal)

  const logout = () => {
    setLocalStorage('accessToken', '')
    setIsLoggedIn(false)
  }

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
            <Header user={user} />
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
              classes={styles.btnCreateRoom}
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
