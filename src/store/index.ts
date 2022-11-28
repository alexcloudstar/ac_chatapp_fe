import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

import { authAPI } from './services/auth'
import { conversationsAPI } from './services/conversations'
import { messagesAPI } from './services/messages'
import { usersAPI } from './services/users'
import { conversationSlice } from './slices/conversations'

const middlewaresArr = [usersAPI.middleware, authAPI.middleware]

export const store = configureStore({
  reducer: {
    [usersAPI.reducerPath]: usersAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [conversationsAPI.reducerPath]: conversationsAPI.reducer,
    [conversationSlice.name]: conversationSlice.reducer,
    [messagesAPI.reducerPath]: messagesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewaresArr),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
