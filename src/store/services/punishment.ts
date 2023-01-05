import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from 'config/env'
import { API_METHODS, PunishmentType, UnpunishType } from 'types'

export const punishmentAPI = createApi({
  reducerPath: 'punishmentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Punishments'],
  endpoints: (builder) => ({
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
    deletePunishment: builder.mutation<UnpunishType, UnpunishType>({
      query: (payload: UnpunishType) => ({
        url: `/admin/${payload.punishmentId ?? -1}`,
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

export const { useAddPunishmentMutation, useDeletePunishmentMutation } =
  punishmentAPI
