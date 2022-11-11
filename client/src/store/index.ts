import { Middleware, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { conversationsAPI } from './services/conversations'
import { usersAPI } from './services/users'
import { tokenSlice } from './slices/token'

const middlewaresArr = [usersAPI.middleware]

export const store = configureStore({
  reducer: {
    [usersAPI.reducerPath]: usersAPI.reducer,
    [conversationsAPI.reducerPath]: conversationsAPI.reducer,
    [tokenSlice.name]: tokenSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewaresArr),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
