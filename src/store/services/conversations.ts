import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  ConversationType,
  CreateConversationType,
  UpdateConversationType,
} from 'components/ChatList/types'
import { API_METHODS } from 'types'

export const conversationsAPI = createApi({
  reducerPath: 'conversationsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Conversations'],
  endpoints: (builder) => ({
    getConversations: builder.query<ConversationType[], null>({
      query: () => ({
        url: '/chatrooms/joined',
        method: API_METHODS.GET,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      providesTags: ['Conversations'],
    }),
    getConversation: builder.query<ConversationType, { roomId: number }>({
      query: ({ roomId }) => ({
        url: `/chatrooms/${roomId}`,
        method: API_METHODS.GET,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      providesTags: ['Conversations'],
    }),
    addConversation: builder.mutation<
      CreateConversationType,
      CreateConversationType
    >({
      query: (payload: CreateConversationType) => ({
        url: '/chatrooms/',
        method: API_METHODS.POST,
        body: { ...payload },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      invalidatesTags: ['Conversations'],
    }),
    updateConversation: builder.mutation<
      UpdateConversationType,
      UpdateConversationType
    >({
      query: (payload: UpdateConversationType) => ({
        url: `/chatrooms/${payload.id}`,
        method: API_METHODS.PATCH,
        body: { ...payload },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      invalidatesTags: ['Conversations'],
    }),
    deleteConversation: builder.mutation<
      ConversationType['id'],
      ConversationType['id']
    >({
      query: (payload: ConversationType['id']) => ({
        url: `/chatrooms/${payload}`,
        method: API_METHODS.DELETE,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      invalidatesTags: ['Conversations'],
    }),
  }),
})

export const {
  useGetConversationQuery,
  useGetConversationsQuery,
  useAddConversationMutation,
  useUpdateConversationMutation,
  useDeleteConversationMutation,
} = conversationsAPI
