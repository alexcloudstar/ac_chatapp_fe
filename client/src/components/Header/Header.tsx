import { FaPlus, FaSearch } from 'react-icons/fa'

import { Button, Header, Search } from '../../stories'

import styles from './header.module.css'

import { useCurrentUserQuery } from '@/store/services/users'
import { ApiState } from '../ApiState'

const ChatHeader = () => {
  const { data, error, isLoading } = useCurrentUserQuery()

  const createRoom = () => {
    console.log('creating room...')
  }

  if (error) return <ApiState errorMessage={error.data.message} />

  if (isLoading) return <ApiState />

  return (
    <div className={styles.container}>
      <div>
        <Header user={data} />
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
