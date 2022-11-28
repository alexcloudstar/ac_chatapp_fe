import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_METHODS, AuthFormInputs, User } from 'types'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/auth/' }),
  tagTypes: ['Auth'],

  endpoints: (builder) => ({
    signin: builder.mutation<AuthFormInputs, AuthFormInputs>({
      query: (payload: AuthFormInputs) => ({
        url: 'signin/',
        method: API_METHODS.POST,
        body: { ...payload },
      }),
      invalidatesTags: ['Auth'],
    }),
    signup: builder.mutation<AuthFormInputs, AuthFormInputs>({
      query: (payload: AuthFormInputs) => ({
        url: 'signup/',
        method: API_METHODS.POST,
        body: { ...payload },
      }),
      invalidatesTags: ['Auth'],
    }),
    signout: builder.mutation<User['id'], User['id']>({
      query: (payload: User['id']) => ({
        url: `signout/${payload}`,
        method: API_METHODS.POST,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const {
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,
} = authAPI
