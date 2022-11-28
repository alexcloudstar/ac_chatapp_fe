import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ConversationType } from 'components/ChatList/types'
import { API_METHODS, RemoveMessageType, SendMessageType } from 'types'

export const messagesAPI = createApi({
  reducerPath: 'messagesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getRoomMessages: builder.query<ConversationType[], { roomId: number }>({
      query: ({ roomId }: { roomId: number }) => ({
        url: `/messages/room/${roomId}`,
        method: API_METHODS.GET,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation<SendMessageType, SendMessageType>({
      query: (payload: SendMessageType) => ({
        url: `/messages/${payload.roomId}`,
        method: API_METHODS.POST,
        body: { message: payload.message },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      invalidatesTags: ['Messages'],
    }),
    deleteMessage: builder.mutation<RemoveMessageType, RemoveMessageType>({
      query: (payload: RemoveMessageType) => ({
        url: `/messages/${payload.roomId}`,
        method: API_METHODS.DELETE,
        body: { messageId: payload.messageId },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const {
  useGetRoomMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
} = messagesAPI
