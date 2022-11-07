import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export type TokenState = {
  isLoggedIn: boolean
  token: string
}

const initialState: TokenState = {
  isLoggedIn: false,
  token: '',
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const { setToken, setIsLoggedIn } = tokenSlice.actions

export default tokenSlice.reducer
