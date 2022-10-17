import React from 'react'

import styles from './chatlist.module.css'
import { Preview } from './components'

const ChatList = () => {
  return (
    <div className={`${styles.container}`}>
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
    </div>
  )
}

export default ChatList
