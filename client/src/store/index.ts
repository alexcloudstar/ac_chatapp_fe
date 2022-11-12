import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authAPI } from './services/auth'
import { conversationsAPI } from './services/conversations'
import { usersAPI } from './services/users'

const middlewaresArr = [usersAPI.middleware, authAPI.middleware]

export const store = configureStore({
  reducer: {
    [usersAPI.reducerPath]: usersAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [conversationsAPI.reducerPath]: conversationsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewaresArr),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
