import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_METHODS } from '@/types'
import { ConversationType } from '@/components/ChatList/types'

export const conversationsAPI = createApi({
  reducerPath: 'conversationsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Conversations'],

  endpoints: (builder) => ({
    conversations: builder.query<ConversationType[], void>({
      query: () => ({
        url: '/chatrooms/joined',
        method: API_METHODS.GET,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
  }),
})

export const { useConversationsQuery } = conversationsAPI
