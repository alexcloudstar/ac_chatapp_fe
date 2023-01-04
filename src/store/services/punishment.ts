import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  ConversationType,
  UpdateConversationType,
} from 'components/ChatList/types'
import { API_URL } from 'config/env'
import { API_METHODS, PunishmentType } from 'types'

export const punishmentAPI = createApi({
  reducerPath: 'punishmentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Punishments'],
  endpoints: (builder) => ({
    // getConversations: builder.query<ConversationType[], null>({
    //   query: () => ({
    //     url: '/chatrooms/joined',
    //     method: API_METHODS.GET,
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //       Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    //     },
    //   }),
    //   providesTags: ['Conversations'],
    // }),
    // getConversation: builder.query<ConversationType, { roomId: number }>({
    //   query: ({ roomId }) => ({
    //     url: `/chatrooms/${roomId}`,
    //     method: API_METHODS.GET,
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //       Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    //     },
    //   }),
    //   providesTags: ['Conversations'],
    // }),
    addPunishment: builder.mutation<PunishmentType, PunishmentType>({
      query: (payload: PunishmentType) => ({
        url: '/admin/punish/',
        method: API_METHODS.POST,
        body: { ...payload },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
      invalidatesTags: ['Punishments'],
    }),
    // TODO: Still need to implement this
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
      invalidatesTags: ['Punishments'],
    }),
    deletePunishment: builder.mutation<
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
      invalidatesTags: ['Punishments'],
    }),
  }),
})

export const {
  useAddPunishmentMutation,
  useUpdateConversationMutation,
  useDeletePunishmentMutation,
} = punishmentAPI
