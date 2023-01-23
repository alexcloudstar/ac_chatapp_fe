import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import { type ConversationType } from 'components/ChatList/types'
import { useGetConversationsQuery } from 'store/services/conversations'
import {
  filterConversations,
  setConversations,
} from 'store/slices/conversations'
import { Search } from 'stories'
import { ReduxQueryType } from 'types'

import styles from './searchBar.module.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState<string>('')

  const { data: conversations } = useGetConversationsQuery<
    ReduxQueryType<ConversationType[]>
  >(null, {
    refetchOnMountOrArgChange: false,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    dispatch(filterConversations(e.target.value))
  }

  const onSearch = () => console.log('123')

  useEffect(() => {
    if (!query) {
      dispatch(setConversations(conversations))
    }
  }, [conversations, dispatch, query])

  return (
    <Search
      query={query}
      placeholder="Search for rooms"
      icon={<FaSearch />}
      onChange={onChange}
      onSearch={onSearch}
      classes={styles.customInput}
    />
  )
}

export default SearchBar
