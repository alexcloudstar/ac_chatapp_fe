import { createSlice } from '@reduxjs/toolkit'

import { ConversationType } from 'components/ChatList/types'

import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: ConversationType[] = []

export const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<ConversationType[]>) => {
      return (state = action.payload)
    },
    getConversations: (state) => {
      return state
    },
    filterConversations: (state, action: PayloadAction<string>) => {
      return state.filter((conversation) =>
        conversation.name.toLowerCase().includes(action.payload)
      )
    },
  },
})

export const { setConversations, getConversations, filterConversations } =
  conversationSlice.actions

export default conversationSlice.reducer
