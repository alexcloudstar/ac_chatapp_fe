import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IProfileFormProps } from 'pages/profile/Profile'
import { User, API_METHODS } from 'types'

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
      providesTags: ['User'],
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
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<User, { id: number; body: IProfileFormProps }>(
      {
        query: (payload: { id: number; body: IProfileFormProps }) => ({
          url: `/users/update-user/${payload.id}`,
          method: API_METHODS.PATCH,
          body: { ...payload.body },
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${
              localStorage.getItem('accessToken') || ''
            }`,
          },
        }),
        invalidatesTags: ['User'],
      }
    ),
  }),
})

export const {
  useCurrentUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} = usersAPI
