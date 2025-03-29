import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'
import tagTypes from './tagTypes'
import { IReqNotifications, IResNotification } from '../types/notification'
import { IResList } from '../types/common'

// Api
export const NotificationApi = createApi({
  reducerPath: 'NotificationApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getNotifications: builder.query<IResList<IResNotification>, IReqNotifications>({
      query: (params) => ({
        url: `/notifications`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.Notifications],
    }),
    getNotificationUnReadCount: builder.query<{ count: number }, void>({
      query: () => ({
        url: `/notifications/count/all`,
        method: 'GET',
      }),
      providesTags: [tagTypes.Notifications],
    }),
    markAllAuditNotificationAsRead: builder.mutation<void, number>({
      query: (locationId) => ({
        url: `/notifications/audit/${locationId}/read-all`,
        method: 'PATCH',
      }),
      invalidatesTags: [tagTypes.Notifications],
    }),
    markOneAuditNotificationAsRead: builder.mutation<void, number>({
      query: (notificationId) => ({
        url: `/notifications/audit/${notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: [tagTypes.Notifications],
    }),
    markAllDeviceNotificationAsRead: builder.mutation<void, number>({
      query: (locationId) => ({
        url: `/notifications/device/${locationId}/read-all`,
        method: 'PATCH',
      }),
      invalidatesTags: [tagTypes.Notifications],
    }),
    markOneDeviceNotificationAsRead: builder.mutation<void, number>({
      query: (notificationId) => ({
        url: `/notifications/device/${notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: [tagTypes.Notifications],
    }),
  }),
})
