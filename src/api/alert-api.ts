import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'
import tagTypes from './tagTypes'
import { IResList } from '../types/common'
import { AlertIdsPayload, INotificationAlertData, IReqAlert, IReqAlertList, IReqRemark, IReqRemind, IResAlert, IResAlertCreate } from './models/alert'

// Api
export const AlertApi = createApi({
  reducerPath: 'AlertApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAlerts: builder.query<IResList<IResAlert>, IReqAlertList>({
      query: (params) => ({
        url: `/alerts`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.Alerts],
    }),
    getOneAlert: builder.query<INotificationAlertData, number>({
      query: (id) => ({
        url: `/alerts/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.Alerts],
    }),
    deleteAlertById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/alerts/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.AlertList],
    }),
    getAlertsForNotification: builder.query<
      IResList<INotificationAlertData>,
      { page: number; limit: number }
    >({
      query: (params) => ({
        url: `/alerts/notification`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.Alerts],
    }),
    getAlertUnreadCount: builder.query<{ count: number }, void>({
      query: () => ({
        url: `/alerts/count/all`,
        method: 'GET',
      }),
      providesTags: [tagTypes.Alerts],
    }),
    sendRemind: builder.mutation<void, IReqRemind>({
      query: (body) => ({
        url: `/alerts/remind`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [tagTypes.Alerts],
    }),
    markOneAlertAsRead: builder.mutation<void, number>({
      query: (id) => ({
        url: `/alerts/${id}/mark-as-read`,
        method: 'PATCH',
      }),
      invalidatesTags: [tagTypes.Alerts],
    }),
    markAllAlertAsRead: builder.mutation<void, number>({
      query: (locationId) => ({
        url: `/alerts/${locationId}/mark-all-as-read`,
        method: 'PATCH',
      }),
      invalidatesTags: [tagTypes.Alerts],
    }),
    updateRemark: builder.mutation({
      query: ({ id, payload }: { id: number; payload: Partial<IReqRemark> }) => ({
        url: `/alerts/${id}/remark`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [tagTypes.Alerts, tagTypes.AlertList],
    }),
    createAlert: builder.mutation<IResAlertCreate, IReqAlert>({
      query: (req) => ({
        url: `/alerts`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: IResAlertCreate) => res,
      invalidatesTags: [tagTypes.AlertList],
    }),
    deleteAlert: builder.mutation<any, AlertIdsPayload>({
      query: (req) => ({
        url: `/alerts/delete`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: any) => res,
      invalidatesTags: [tagTypes.AlertList],
    }),
    alertBatchUpdate: builder.mutation<any, IReqAlert[]>({
      query: (alerts) => ({
        url: `/alerts/batch/update`,
        method: 'POST',
        body: { alerts },
      }),
      invalidatesTags: [tagTypes.AlertList],
    }),
    alertBatchCreate: builder.mutation<any, IReqAlert[]>({
      query: (alerts) => ({
        url: `/alerts/batch/create`,
        method: 'POST',
        body: { alerts },
      }),
      invalidatesTags: [tagTypes.AlertList],
    }),
  }),
  
})
