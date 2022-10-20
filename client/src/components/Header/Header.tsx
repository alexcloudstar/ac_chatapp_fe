import React from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa'

import { Search, Button, Header } from '../../stories'

import styles from './header.module.css'

import { API_METHODS } from '@/types'
import { fetchAPI } from '@/utils/api'
import { getLocalStorage } from '@/utils/localStorage'

const ChatHeader = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Close&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale',
  }

  const createRoom = () => {
    console.log('creating room...')
  }

  const getUser = async () => {
    const APIData = await fetchAPI(
      'http://localhost:4000/users/whoami',
      API_METHODS.GET,
      // null,
      getLocalStorage('accessToken') || ''
    )

    console.log(APIData)
  }

  return (
    <div className={styles.container}>
      <div>
        <Header user={user} />
        <button onClick={getUser}>Get User</button>
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
