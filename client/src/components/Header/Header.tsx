import { FC } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { Button, Header, Search } from '../../stories'
import { ApiState } from '../ApiState'
import { AuthProps } from '../Auth/types'

import styles from './header.module.css'

import { useCurrentUserQuery } from '@/store/services/users'
import { setLocalStorage } from '@/utils/localStorage'

const ChatHeader: FC<AuthProps> = ({ setIsLoggedIn }) => {
  const { data: user, error, isLoading } = useCurrentUserQuery()

  const createRoom = () => {
    console.log('creating room...')
  }

  const logout = () => {
    setLocalStorage('accessToken', '')
    setIsLoggedIn(false)
  }

  if (error) return <ApiState errorMessage={error?.data?.message} />

  if (isLoading) return <ApiState />

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center cursor-pointer">
        <Header user={user} />
        <FiLogOut onClick={logout} />
      </div>

      <div className="flex items-end">
        <Search query="" icon={<FaSearch />} classes={styles.customInput} />
        <Button
          icon={<FaPlus />}
          classes={styles.btnCreateRoom}
          onClick={createRoom}
        />
      </div>
    </div>
  )
}

export default ChatHeader
