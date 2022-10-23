import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { usersAPI } from './services/users'

const middlewaresArr = [usersAPI.middleware]

export const store = configureStore({
  reducer: {
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewaresArr),
})

setupListeners(store.dispatch)
