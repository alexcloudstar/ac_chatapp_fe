import React from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa'

import { Search, Button, Header } from '../../stories'

import styles from './header.module.css'

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

  return (
    <div className={styles.container}>
      <div>
        <Header user={user} />
      </div>

      <div className={styles.searchContainer}>
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
