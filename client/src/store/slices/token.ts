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
      console.log('123')
    },
    setToken: (state, action: PayloadAction<string>) => {
      console.log('123')
      state.token = action.payload
    },
  },
})

export const { setToken, setIsLoggedIn } = tokenSlice.actions

export default tokenSlice.reducer
