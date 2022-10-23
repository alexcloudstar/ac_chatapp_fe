import React, { useCallback, useEffect, useState } from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa'

import { Search, Button, Header, Avatar } from '../../stories'

import styles from './header.module.css'

import { User } from '@/stories/types'
import { API_METHODS } from '@/types'
import { fetchAPI } from '@/utils/api'
import { getLocalStorage } from '@/utils/localStorage'

const ChatHeader = () => {
  const [user, setUser] = useState<User>()

  const createRoom = () => {
    console.log('creating room...')
  }

  const getUser = useCallback(async () => {
    try {
      const APIData: User = await fetchAPI(
        'http://localhost:4000/users/whoami',
        API_METHODS.GET,
        getLocalStorage('accessToken') || ''
      )

      setUser(APIData)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div className={styles.container}>
      <div>
        <Header user={user} />
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
