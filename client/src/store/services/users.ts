import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { User } from '@/stories/types'
import { API_METHODS } from '@/types'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['User'],

  endpoints: (builder) => ({
    currentUser: builder.query<User, void>({
      query: () => ({
        url: '/users/whoami',
        method: API_METHODS.GET,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users/',
        method: API_METHODS.GET,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
    }),
  }),
})

export const { useCurrentUserQuery, useGetUsersQuery } = usersAPI
