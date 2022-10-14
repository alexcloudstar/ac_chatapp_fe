import React from 'react'
import { FaSearch } from 'react-icons/fa'

import { Header, Search } from '../stories'

import styles from './home.module.css'

const Home = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Close&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale',
  }
  return (
    <div className={styles.container}>
      <div>
        <Header user={user} />
      </div>

      <div className={styles.searchContainer}>
        <Search query="" icon={<FaSearch />} classes={styles.customInput} />
      </div>
    </div>
  )
}

export default Home
